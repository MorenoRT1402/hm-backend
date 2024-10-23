CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- Clave primaria autoincremental
    date DATETIME NOT NULL,               -- Fecha de contacto
    customer VARCHAR(255) NOT NULL,       -- Nombre del cliente
    email VARCHAR(255) NOT NULL,          -- Email del cliente
    phone VARCHAR(50),                    -- Número de teléfono
    subject VARCHAR(255),                 -- Asunto del contacto
    comment TEXT,                         -- Comentarios adicionales
    archived BOOLEAN NOT NULL DEFAULT 0   -- Indica si está archivado o no
);