-- Database schema and initial data for Todo application
-- This file can be executed in pgAdmin or using psql command

-- Create task table
create table if not exists task (  
    id serial primary key, 
    description varchar(255) not null  
);

-- Create account table for user authentication
create table if not exists account (
    id serial primary key,
    email varchar(255) not null unique,
    password varchar(255) not null
);

-- Clear existing data (for testing)
truncate table task restart identity cascade;
truncate table account restart identity cascade;

-- Insert initial data
insert into task (description) values  
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');
