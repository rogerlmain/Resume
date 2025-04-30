create table categories (
	id varchar (36) primary key not null,
    name varchar (48) not null
);

alter table technologies 
	add column category_id varchar (36), 
    add constraint fk_technologies_to_categories foreign key (category_id) references categories (id);
    
insert into categories values 
	('38d17c88-25fa-11f0-a7ca-dc454691e924', 'Programming languages'),
    ('38d18081-25fa-11f0-a7ca-dc454691e924', 'Client-side scripting languages'),
    ('38d1813c-25fa-11f0-a7ca-dc454691e924', 'Databases');
    
update technologies set category_id = '38d17c88-25fa-11f0-a7ca-dc454691e924' where id = '06bf645a-2519-11f0-a7ca-dc454691e924';
update technologies set category_id = '38d18081-25fa-11f0-a7ca-dc454691e924' where id = '86555e2e-ba10-40c6-9720-2ba0e303dadb';

