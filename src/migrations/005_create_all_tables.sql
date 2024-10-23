USE hmdb;

-- Tabla de contactos
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

-- Tabla de usuarios
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

-- Tabla de habitaciones
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

-- Tabla de reservas
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- Clave primaria autoincremental
    guest VARCHAR(255) NOT NULL,           -- Nombre del huésped
    picture VARCHAR(255),                  -- URL de la imagen
    orderDate DATETIME NOT NULL,           -- Fecha de la orden
    checkIn DATETIME NOT NULL,             -- Fecha de check-in
    checkOut DATETIME NOT NULL,            -- Fecha de check-out
    discount INT,                          -- Descuento (entero)
    notes TEXT,                            -- Notas (almacenadas como texto largo)
    room INT,                              -- Referencia a la habitación
    status VARCHAR(50) NOT NULL            -- Estado de la reserva
);
