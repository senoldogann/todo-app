# Todo App

Todo-sovellus Reactilla, Node.js:llä ja PostgreSQL:llä.

## Asennus

### 1. Riippuvuudet
```bash
cd server && npm install
cd ../frontend && npm install
```

### 2. Tietokanta
PostgreSQL:ssä luo tietokannat ja suorita `server/db.sql`.

### 3. .env tiedostot

**server/.env:**
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=todo
TEST_DB_NAME=test_todo
DB_PASSWORD=salasanasi
DB_PORT=5432
PORT=3001
JWT_SECRET=avain
```

**frontend/.env:**
```
VITE_API_URL=http://localhost:3001
```

### 4. Käynnistä
```bash
cd server && npm run devStart
```
Toisessa terminaalissa:
```bash
cd frontend && npm run dev
```
Avaa `http://localhost:5173` selaimessa.
