-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
--insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-1');
--insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-2');
--insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-3');

INSERT INTO t_beat (guid, name, price, producedby) VALUES ('123e4567-e89b-12d3-a456-556642440000', 'name0', 23.99, 'prod0');
INSERT INTO t_beat (guid, name, price, producedby) VALUES ('323e4567-e89b-12d3-a456-556642440000', 'name1', 24.99, 'prod1');
INSERT INTO t_beat (guid, name, price, producedby) VALUES ('223e4567-e89b-12d3-a456-556642440000','name2', 21.99, 'prod2');