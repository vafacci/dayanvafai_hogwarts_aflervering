-- Kør dette i pgAdmin (Query Tool)

CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT,
  colors TEXT,
  founder TEXT
);

INSERT INTO houses (name, colors, founder) VALUES
  ('Gryffindor', 'Scarlet and gold', 'Godric Gryffindor'),
  ('Slytherin', 'Green and silver', 'Salazar Slytherin'),
  ('Hufflepuff', 'Yellow and black', 'Helga Hufflepuff'),
  ('Ravenclaw', 'Blue and bronze', 'Rowena Ravenclaw');
