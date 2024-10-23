CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,     -- Clave primaria autoincremental
    dateAdded DATETIME NOT NULL,           -- Fecha de creación
    roomType VARCHAR(100) NOT NULL,        -- Tipo de habitación
    number INT NOT NULL,                   -- Número de la habitación
    picture VARCHAR(255),                  -- URL de la imagen de la habitación
    bedType VARCHAR(100),                  -- Tipo de cama
    roomFloor VARCHAR(50),                 -- Piso de la habitación
    facilities TEXT,                       -- Facilidades de la habitación (almacenado como texto, separado por comas)
    rate DECIMAL(10, 2),                   -- Tarifa de la habitación (almacenada como decimal)
    discount INT,                          -- Descuento (entero)
    status VARCHAR(50) NOT NULL            -- Estado de la habitación (por ejemplo, "Booked")
);