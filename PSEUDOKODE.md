# Pseudokode

Her fortæller jeg kort hvad hvert endpoint gør.

# Hent alle (GET /houses, /teachers, /students, /courses)

1. Hent alle fra databasen
2. Send dem tilbage

# Hent én (GET /houses/:id, /teachers/:id, /students/:id)

1. Tag id fra URL
2. Hent den ene fra databasen
3. Findes den ikke → 404
4. Ellers send den tilbage

# Opret (POST /teachers, /students, /courses)

1. Tag data fra body
2. Gem i databasen
3. Send den nye tilbage

# Opdater (PUT /teachers/:id, /students/:id, /courses/:id)

1. Tag id fra URL
2. Tag nye data fra body
3. Opdater i databasen
4. Send den opdaterede tilbage

# Slet (DELETE /teachers/:id, /students/:id, /courses/:id)

1. Tag id fra URL
2. Slet fra databasen
3. Send ok tilbage


# GET /courses/:id

1. Hent kursus
2. Hent teacher
3. Hent students
4. Send det hele tilbage

# PUT /courses/:id/teacher

1. Tag course id og teacher_id
2. Opdater teacher på kurset
3. Send kurset tilbage

# POST /courses/:id/students

1. Tag course id og student_id
2. Tilføj eleven til kurset
3. Send ok tilbage

# DELETE /courses/:id/students/:studentId

1. Tag course id og student id
2. Fjern eleven fra kurset
3. Send ok tilbage
