CREATE DATABASE Assignment;

USE Assignment;

CREATE TABLE user (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    userLastName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL
);


CREATE TABLE vendors (
    vendorid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT,
    vendorName VARCHAR(255) NOT NULL,
    bankAcntNo VARCHAR(255) NOT NULL,
    bankName VARCHAR(255) NOT NULL,
    addressLineOne VARCHAR(255) NOT NULL,
    addressLineTwo VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    FOREIGN KEY (userid) REFERENCES user(userid)
);


ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;