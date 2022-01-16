-- CREATE DATABASE mvp;
-- CREATE TABLE info  (
--   id serial,
--   user_name text,
--   name text,
--   position text,
--   url text,
--   date DATE,
--   importance int,
--   status text,
--   comment text
-- );

-- CREATE TABLE user_info (
--   uid text,
--   name text
-- );
-- create index uid_index on user_info(uid);
-- CREATE INDEX user_index on info(user_name);


insert into info (user_name,name,position,url,date,importance,status)
values ('test', 'GOOGLE','software engineer','https://careers.google.com/jobs/results/126694548232381126/'
,'12/03/2021','5','Applied');
