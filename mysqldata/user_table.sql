USE hackathon;

CREATE TABLE register_user (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    surname VARCHAR(100),
    email VARCHAR(255),
    promotion VARCHAR(100),
    speciality VARCHAR(100)
);

INSERT INTO register_user(name, surname,email,promotion,speciality) VALUES("Louf","Alexandre","contact@alexandrelouf.fr","EISI","AWBD");