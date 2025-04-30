drop table if exists lookups;
drop table if exists lookup_types;

create table lookup_types (
	id varchar (36) primary key not null,
    name varchar (36) not null
);

insert into lookup_types values
	('ab640c8e-2536-11f0-a7ca-dc454691e924', 'City'),
    ('ab6410af-2536-11f0-a7ca-dc454691e924', 'State'),
    ('ab641207-2536-11f0-a7ca-dc454691e924', 'Country');
    
select * from lookup_types;

create table lookups (
	id varchar (36) primary key not null,
    lookup_type_id varchar (36) not null,
    parent_id varchar (36),
    name varchar (64) not null,
    
    constraint fk_lookups_to_lookup_types foreign key (lookup_type_id) references lookup_types (id),
    constraint fk_lookups_to_parent foreign key (parent_id) references lookups (id)
);

insert into lookups values 
	('5724785a-2537-11f0-a7ca-dc454691e924', 'ab641207-2536-11f0-a7ca-dc454691e924', null, 'Australia'),
    ('57247da6-2537-11f0-a7ca-dc454691e924', 'ab641207-2536-11f0-a7ca-dc454691e924', null, 'USA');

select * from lookups where lookup_type_id = (select id from lookup_types where name = 'Country');

insert into lookups values
	('04efec4a-2538-11f0-a7ca-dc454691e924', 'ab6410af-2536-11f0-a7ca-dc454691e924', '5724785a-2537-11f0-a7ca-dc454691e924', 'NSW'),
    ('04eff1b9-2538-11f0-a7ca-dc454691e924', 'ab6410af-2536-11f0-a7ca-dc454691e924', '57247da6-2537-11f0-a7ca-dc454691e924', 'Colorado'),
    ('04eff26f-2538-11f0-a7ca-dc454691e924', 'ab6410af-2536-11f0-a7ca-dc454691e924', '57247da6-2537-11f0-a7ca-dc454691e924', 'Ohio');
    
select * from lookups where lookup_type_id = (select id from lookup_types where name = 'State');

insert into lookups values
	('236d1f34-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04efec4a-2538-11f0-a7ca-dc454691e924', 'Sydney'),
    ('236d26c8-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Denver'),
    ('236d27dc-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Lakewood'),
    ('236d286f-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Greenwood Village'),
    ('236d28e4-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Boulder'),
    ('236d295d-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Englewood'),
    ('236d29c3-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Centennial'),
    ('236d2a25-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff1b9-2538-11f0-a7ca-dc454691e924', 'Louisville'),
    ('236d2a8a-253a-11f0-a7ca-dc454691e924', 'ab640c8e-2536-11f0-a7ca-dc454691e924', '04eff26f-2538-11f0-a7ca-dc454691e924', 'Westerville');

select * from lookups where lookup_type_id = (select id from lookup_types where name = 'City');

