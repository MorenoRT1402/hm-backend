CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,     -- Clave primaria autoincremental
    name VARCHAR(255) NOT NULL,            -- Nombre del usuario
    picture VARCHAR(255),                  -- URL de la imagen de perfil
    position VARCHAR(100),                 -- Posición o cargo del usuario
    email VARCHAR(255) NOT NULL UNIQUE,    -- Email del usuario, debe ser único
    contact VARCHAR(50),                   -- Número de contacto
    joined DATETIME NOT NULL,              -- Fecha de ingreso
    jobDesk TEXT,                          -- Descripción del trabajo
    schedule TEXT,                         -- Horario almacenado como texto separado por comas
    status VARCHAR(50) NOT NULL,           -- Estado del usuario (ejemplo: "Active")
    password VARCHAR(255) NOT NULL         -- Contraseña encriptada
);