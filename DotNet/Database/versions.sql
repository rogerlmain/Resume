create table versions (
	id varchar (36) primary key not null,
    technology_id varchar (36) not null,
    version varchar (36),
    release_date int,
    
    constraint fk_versions_to_technologies foreign key (technology_id) references technologies (id)
);