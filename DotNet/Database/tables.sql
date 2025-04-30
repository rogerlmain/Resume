drop table if exists employment_technologies;
drop table if exists technologies;
drop table if exists employment;

create table technologies (
	id varchar (36) primary key not null,
    name varchar (48) not null
);

create table employment (
	id varchar (36) primary key not null,
    company varchar (48) unique not null,
    location_id varchar (36),
    start_date date not null,
    end_date date,
    description text,
    
    constraint fk_employment_to_city_lookup foreign key (location_id) references lookups (id)
);

create table employment_technologies (
	id varchar (36) primary key not null,
    employment_id varchar (36) not null,
    technology_id varchar (36) not null,

    constraint fk_employment_technologies_to_employment foreign key (employment_id) references employment (id),
    constraint fk_employment_technologies_to_technologies foreign key (technology_id) references technologies (id)
);
