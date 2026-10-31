# Hogwarts

Backend til Hogwarts.
Lavet af Dayan Vafai.

Sådan starter du...
1. Lav databasen og kør hogwarts.sql
2. Kopier .env.example til .env og skriv dine egne ting
3. npm install
4. npm start

Så kører den på http://localhost:3000

# Endpoints

# Houses
GET /houses - hent alle huse
GET /houses/:id - hent et hus

# Teachers
GET /teachers - hent alle
GET /teachers/:id - hent en
POST /teachers - opret
PUT /teachers/:id - opdater
DELETE /teachers/:id - slet

# Students
GET /students - hent alle
GET /students/:id - hent en
POST /students - opret
PUT /students/:id - opdater
DELETE /students/:id - slet

# Courses
GET /courses - hent alle
GET /courses/:id - hent et (med teacher og students)
POST /courses - opret
PUT /courses/:id - opdater navn
PUT /courses/:id/teacher - skift teacher
POST /courses/:id/students - tilføj elev
DELETE /courses/:id/students/:studentId - fjern elev
DELETE /courses/:id - slet kursus

# Bruno
Der er tests i mappen Hogwarts.
Start serveren, åbn Bruno, vælg en request og tryk Send.

# Hvad jeg har haft svært ved
Courses blev for svært til sidst.
Derfor har jeg ikke lavet routes til courses, de ligger stadig i server.js.
Jeg har heller ikke lavet controller og repository til alle courses endpoints, nogle har SQL direkte i server.js.
Houses, teachers og students er lavet med routes, controller og repository.
