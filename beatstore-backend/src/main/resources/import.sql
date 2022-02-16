-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
--insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-1');
--insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-2');
--insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-3');

INSERT INTO t_beat (name, price, producedby) VALUES ('name0', 23.99, 'prod0');
INSERT INTO t_beat (name, price, producedby) VALUES ('name1', 24.99, 'prod1');
INSERT INTO t_beat (name, price, producedby) VALUES ('name2', 21.99, 'prod2');