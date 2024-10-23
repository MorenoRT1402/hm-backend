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