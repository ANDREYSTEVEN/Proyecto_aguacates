-- Avocado Delivery - Esquema PostgreSQL
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS clientes (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS productos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS repartidores (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  telefono VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id BIGSERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
  cliente_id BIGINT REFERENCES clientes(id) ON DELETE RESTRICT,
  repartidor_id BIGINT REFERENCES repartidores(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS lineas_pedido (
  id BIGSERIAL PRIMARY KEY,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  pedido_id BIGINT REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id BIGINT REFERENCES productos(id) ON DELETE RESTRICT
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_lineas_pedido_pedido ON lineas_pedido(pedido_id);
CREATE INDEX IF NOT EXISTS idx_lineas_pedido_producto ON lineas_pedido(producto_id);

-- Datos de ejemplo mínimos
INSERT INTO productos (nombre, descripcion, precio) VALUES
('Aguacate Hass', 'Aguacate de exportación', 2.50),
('Aguacate Criollo', 'Sabor tradicional', 1.80)
ON CONFLICT DO NOTHING;

INSERT INTO clientes (nombre, direccion, telefono) VALUES
('Juan Pérez', 'Calle 123', '3001234567'),
('María Gómez', 'Carrera 45 #10', '3019876543')
ON CONFLICT DO NOTHING;

INSERT INTO repartidores (nombre, telefono) VALUES
('Carlos López', '3020001111'),
('Ana Ruiz', '3020002222')
ON CONFLICT DO NOTHING;
