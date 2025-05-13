drop table technology_versions;

create table employment_tech_versions (
	id varchar (36) primary key not null,
    employment_technology_id varchar (36) not null,
    version_id varchar (36) not null,
    
    constraint fk_employment_tech_versions_to_employment_technologies foreign key (employment_technology_id) references employment_technologies (id),
    constraint fk_employment_tech_versions_to_versions foreign key (version_id) references versions (id)
);

select * from employment_tech_versions;