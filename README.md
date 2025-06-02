# Prueba Técnica – Ministerio Público

**Gestor de Casos + API REST + Frontend React**

## Descripción

Aplicación full-stack que permite al Ministerio Público de Guatemala …

* **Registrar y autenticar** usuarios (fiscales, coordinadores).
* **Crear, actualizar y reasignar** casos entre fiscales de una misma fiscalía.
* Llevar **historial de estados** y **logs de reasignación fallida**.
* Consultar estadísticas e informes mediante API REST.

Todo corre en contenedores Docker:

| Servicio          | Tecnología        | Imagen                                       |
| ----------------- | ----------------- | -------------------------------------------- |
| **Frontend**      | React + Vite      | `mp-frontend`                                |
| **Backend**       | Node 18 / Express | `mp-backend`                                 |
| **Base de Datos** | SQL Server 2019   | `mcr.microsoft.com/mssql/server:2019-latest` |

## Funcionalidades clave

| Módulo                  | Detalle                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Usuarios**            | Registro, login, JWT, roles (`fiscal`, `coordinador`)                                                                                    |
| **Casos**               | CRUD completo, asignación inicial, reasignación condicionada                                                                             |
| **Reasignación segura** | Solo si el caso está *pendiente* y nuevo fiscal pertenece a la misma fiscalía; de lo contrario se registra intento en `ReasignacionLogs` |
| **Historial**           | Tabla `CasosHistorial` + vista en frontend tipo línea de tiempo                                                                          |


## Arquitectura

```text
┌───────────────┐        ┌──────────────┐        ┌────────────────┐
│   React app   │──────▶│  Express API │──────▶│ SQL Server 2019│
│  (Vite HMR)   │  fetch │  (Node 18)   │  mssql │    Docker Vol. │
└───────────────┘        └──────────────┘        └────────────────┘
```

Cada arranque del backend:

1. Espera a SQL Server (reintentos con back-off).
2. Crea la base **ministerio** si no existe.
3. Ejecuta `tables.sql` y `procedures.sql` (idempotentes, se saltan si ya existen).

## Requisitos

* **Docker ≥ 24** y **Docker Compose v2**
* 4 GB de RAM libres (SQL Server + Node + React)

## Inicio rápido

```bash
# clona el repo
git clone https://github.com/danbart/prueba-tecnina-mp.git
cd prueba-tecnina-mp.git

# copia .env de ejemplo y personaliza claves
cp .env.example .env

# levantar todo (producción / desarrollo hot-reload)
docker compose up --build
```

| Servicio        | URL                                                    |
| --------------- | ------------------------------------------------------ |
| App React       | [http://localhost:5173](http://localhost:5173)         |
| API REST        | [http://localhost:3000/api](http://localhost:3000/api) |
| SQL Server (sa) | `localhost:1433`                                       |

> **TIP:** durante desarrollo los contenedores montan el código con
> *bind-mounts* y usan **Vite HMR** + **nodemon** → cualquier cambio se
> refleja al instante.

## Variables de entorno principales

| Variable                 | Ejemplo              | Descripción           |
| ------------------------ | -------------------- | --------------------- |
| `DB_PASSWORD`            | `ourStrong!Passw0rd` | contraseña de `sa`    |
| `SECRET_KEY`             | `supersecret`        | clave para firmar JWT |
| `PORT` / `PORT_FRONTEND` | `3000` / `5173`      | puertos publicados    |

> Todas se definen en **.env** y se inyectan a los contenedores vía
> `docker-compose.yml`.

## Estructura de carpetas

```
backend/
  ├─ src/
  │   ├─ controllers/
  │   ├─ services/
  │   ├─ routes/
  │   └─ database/connection.js
  ├─ sql/                # scripts de tablas y SP
  └─ Dockerfile

frontend/
  ├─ src/
  │   ├─ pages/          # Login, Register, Casos, CasoDetalle…
  │   ├─ components/     # Navbar, ProtectedRoute
  │   └─ context/
  └─ Dockerfile

docker-compose.yml
```

## Scripts útiles

```bash

# entrar al shell de SQL Server
docker compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$DB_PASSWORD"

# limpiar todo (incluido volumen de datos)
docker compose down -v
```

## Autor

*Nombre:* **Danilo Solorzano**
*Email:* **\[[danilo_solorzano06@hotmail.com](mailto:anilo_solorzano06@hotmail.com)]**


## Licencia

Este repositorio se entrega como parte de la **Prueba Técnica –
Ministerio Público de Guatemala** y se puede reutilizar con fines
educativos o de evaluación. Para usos comerciales contactar al autor.
