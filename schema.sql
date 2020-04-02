DROP DATABASE IF EXISTS favorites_db;
CREATE DATABASE favorites_db;

USE favorites_db

CREATE TABLE art
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE music
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE meditation
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	PRIMARY KEY (id)
);