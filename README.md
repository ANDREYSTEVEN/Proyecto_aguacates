# Avocado Delivery - Full Stack (Spring Boot + React + PostgreSQL)

## Requisitos
- Java 17
- Maven 3.9+
- Node.js 18+ y npm
- PostgreSQL 14+

## 1) Base de Datos
Crea la base de datos y aplica el esquema:

```bash
createdb avocado_db
psql -d avocado_db -f database/schema.sql
```

> Si usas usuario/clave diferentes a `postgres/postgres`, actualiza `backend-springboot/src/main/resources/application.properties`.

## 2) Backend (Spring Boot)
```bash
cd backend-springboot
mvn spring-boot:run
```
El backend arrancará en `http://localhost:8080`.

## 3) Frontend (React + Vite)
```bash
cd frontend-react
npm install
npm run dev
```
El frontend arrancará en `http://localhost:5173` (por defecto Vite).

## Rutas principales del API
- `GET /api/productos`
- `GET /api/clientes` | `POST /api/clientes` | `DELETE /api/clientes/{id}`
- `GET /api/repartidores` | `POST /api/repartidores` | `DELETE /api/repartidores/{id}`
- `GET /api/pedidos` | `GET /api/pedidos/{id}` | `GET /api/pedidos/cliente/{clienteId}` | `POST /api/pedidos`

### Crear pedido (payload ejemplo)
```json
{
  "cliente": { "id": 1 },
  "repartidor": { "id": 1 },
  "lineas": [
    { "producto": { "id": 1 }, "cantidad": 2 },
    { "producto": { "id": 2 }, "cantidad": 1 }
  ]
}
```
