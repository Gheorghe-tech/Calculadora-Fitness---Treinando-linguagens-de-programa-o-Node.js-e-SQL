CREATE DATABASE banco_calculadora_fitness;

USE banco_calculadora_fitness;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INT(2) NOT NULL,
    peso INT(5) NOT NULL,
    altura INT(5) NOT NULL,
    sexo VARCHAR(15) NOT NULL,
    total_calorias INT(4) NOT NULL,
    total_nutrientes INT(4) NOT NULL,
    min_agua DECIMAL(2, 1) NOT NULL,
    ideal_agua DECIMAL(2, 1) NOT NULL,
    kcal_carboidrato INT(3) NOT NULL,
    kcal_proteina INT(3) NOT NULL,
    kcal_gordura INT(3) NOT NULL,
    carboidrato INT(3) NOT NULL,
    proteina INT(3) NOT NULL,
    gordura INT(3) NOT NULL
);

select * from usuario;