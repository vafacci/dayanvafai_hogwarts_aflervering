-- ============================================
-- Hogwarts database
-- Kør i pgAdmin / DataGrip på en tom database "hogwarts"
-- Primary keys + foreign keys (normaliseret)
-- ============================================

-- Slet gamle tabeller (rækkefølge pga. FK)
DROP TABLE IF EXISTS course_students;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS houses;

-- HOUSES
CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  colors TEXT,
  founder TEXT
);

INSERT INTO houses (name, colors, founder) VALUES
  ('Gryffindor', 'Scarlet and gold', 'Godric Gryffindor'),
  ('Slytherin', 'Green and silver', 'Salazar Slytherin'),
  ('Hufflepuff', 'Yellow and black', 'Helga Hufflepuff'),
  ('Ravenclaw', 'Blue and bronze', 'Rowena Ravenclaw');

-- TEACHERS (house_id -> houses)
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INT NOT NULL REFERENCES houses(id)
);

INSERT INTO teachers (name, house_id) VALUES
  ('Severus Snape', 2),      -- Slytherin
  ('Minerva McGonagall', 1), -- Gryffindor
  ('Filius Flitwick', 4);    -- Ravenclaw

-- STUDENTS (house_id -> houses)
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  year INT,
  house_id INT NOT NULL REFERENCES houses(id)
);

INSERT INTO students (name, year, house_id) VALUES
  ('Harry Potter', 5, 1),
  ('Hermione Granger', 5, 1),
  ('Ron Weasley', 5, 1),
  ('Draco Malfoy', 5, 2);

-- COURSES (teacher_id -> teachers)
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  teacher_id INT REFERENCES teachers(id)
);

INSERT INTO courses (name, teacher_id) VALUES
  ('Potions', 1),  -- Snape
  ('Charms', 3);   -- Flitwick

-- COURSE_STUDENTS (many-to-many: courses <-> students)
CREATE TABLE course_students (
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1), -- Potions: Harry
  (1, 2), -- Potions: Hermione
  (1, 3), -- Potions: Ron
  (2, 1), -- Charms: Harry
  (2, 2); -- Charms: Hermione
