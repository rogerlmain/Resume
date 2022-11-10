<?php


require_once ("base.php");


class database extends base {
		
	
	private $schema = null;
	private $connection = null;
	
	
	private const credentials = array (
		"server" 	=> "localhost",
		"username" 	=> "root",
		"password"	=> "stranger"
	)/* credentials */;
	
	
	private function parameterize ($query, $parameters) {
		foreach ($parameters as $key => $parameter) {
			$query = preg_replace ("/\{\{{$key}\}\}/", $parameter, $query);
		}// foreach;
		return $query;
	}// parameterize;
	
	
	private function select_columns ($tablename) {
		$query = "
			select
				column_name,
			    data_type
			from
				information_schema.columns
			where
				(table_name = '{$tablename}') and
			    (table_schema = '{$this->schema}');
		";
		return $this->query ($query);
	}// select_columns;
	
	
	private function update_parameters ($parameters) {
		$result = null;
		foreach ($parameters as $name => $value) {
			if (is_null ($result)) $result = array ();
			array_push ($result, "{$name} = {$value}");
		}// foreach;
		return implode (comma, $result);
	}// update_parameters;
	
	
	private function table_columns ($tablename, $parameters) {
		$result = null;
		$columns = $this->select_columns ($tablename);
		
		while ($column = $columns->fetch_assoc ()) {

			$column_name = $column ["COLUMN_NAME"];
			$column_value = array_key_exists ($column_name, $parameters) ? $parameters [$column_name] : null;
			
			$password_field = $column_name == "password";
			
			if (not_set ($column_value)) continue;
			
			if (is_null ($result)) $result = array ();
			if ($column_value === "on") $column_value = "true";
			if ($password_field) $column_value = "md5('{$column_value}')";
			
			$result [$column_name] = (in_array ($column ["DATA_TYPE"], array ("bit", "int", "tinyint")) or $password_field)  ? $column_value : "'{$column_value}'";
		}// foreach;
		return $result;
	}// table_columns;
	
	
	private function insert ($tablename, $parameters) {
		$columns = $this->table_columns ($tablename, $parameters); 
		$fields = implode (comma, array_keys ($columns));
		$values = implode (comma, array_values ($columns));
		$query = "insert into `{$tablename}` ({$fields}) values ({$values});";
		$result = ($this->query ($query, true));
		return $result;
	}// insert;"
	
	
	private function update ($tablename, $parameters, $id) {
		$columns = $this->table_columns ($tablename, $parameters);
		$query = "update {$tablename} set {$this->update_parameters ($columns)} where id = {$id};";
		return ($this->query ($query) === true) ? $id : null;
	}// update;
	
	
	private function select ($table_name, $query_name, $parameters) {
		$xml = simplexml_load_string (file_get_contents (self::root_path ("Data/{$table_name}.xml")));
		return $this->query ($this->parameterize ((string) $xml->$query_name [0], $parameters));
	}// select;
	
	
	/********/
	
	
	// Base to all select functions - can take:
	//		$query - an actual query or a query name if tablename is set
	//		$tablename - the name of the Data/[table].xml file to read
	//		$parameters - optional parameters to pass to 
	
	
	protected function select_rows ($query, $tablename = null, $parameters = null) {
		if (isset ($parameters) && $this->not_set ($tablename)) throw new Exception ("select_rows called with parameters but no table");
		switch (isset ($tablename)) {
			case true: $result = $this->select ($tablename, $query, $parameters); break;
			default: $result = $this->query ($query); break;
		}// switch;
		if ($result->num_rows == 0) return null;
		return $result->fetch_all (MYSQLI_ASSOC);
	}// select_rows;
	
	
	protected function select_row ($query, $tablename = null, $parameters = null) {
		$result = $this->select_rows ($query, $tablename, $parameters);
		return (isset ($result) && (count ($result) > 0)) ? $result [0] : null;
	}// select_row;
	
	
	protected function query ($query, $save = false) {
		$result = $this->connection->query ($query);
		if (!$result) common::record_error ($this->connection->error);
		return ($save) ? $this->connection->insert_id : $result;
	}// query;
	
	
	/**** Public Section ****/
		
		
	public function record_exists ($table, $conditions) {
		$conditional = null;
		if (is_array ($conditions)) {
			foreach ($conditions as $name => $value) {
				if (is_null ($conditional)) $conditional = Array ();
				array_push ($conditional, "({$name} = {$value})");
			}// foreach;
			$conditions = implode (" and ", $conditional);
		}// if;				
		
		$result = $this->select_row ("select (count(*) > 0) as `exists` from {$table} where {$conditions}");
		return is_null ($result) ? false : $this->boolean_value ($result ["exists"]);
	}// record_exists;
		
		
	public function save ($tablename, $parameters, $id = null) {
		if (is_null ($id)) return $this->insert ($tablename, $parameters);
		return $this->update ($tablename, $parameters, $id);
	}// save;
	
	
	/**** Constructor ****/
	
	
	public function __construct ($schema) {
		$this->connection = new mysqli (self::credentials ["server"], self::credentials ["username"], self::credentials ["password"]);
		$this->connection->select_db ($schema);
		$this->schema = $schema;
	}// Constructor;
	
	
}// database;
	
