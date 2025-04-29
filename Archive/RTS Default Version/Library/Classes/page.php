<?php 


require_once ("base.php");


class page extends base {
	
	
	public function file_control () {
		$parameters = func_get_args ();
		return $this->load_control ("Library/Controls/file.upload.php");
	}// save;
	
	
}// page;