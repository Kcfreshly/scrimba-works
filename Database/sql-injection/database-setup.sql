CREATE TABLE IF NOT EXISTS dealerships (
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  state CHAR(2) NOT NULL,
  established DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    dealership_id INTEGER REFERENCES dealerships(id),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    color TEXT NOT NULL,
    condition INTEGER NOT NULL,
    sold BOOLEAN NOT NULL
  );

CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  dealership_id INTEGER REFERENCES dealerships(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sold_cars (
  id SERIAL PRIMARY KEY,
  cars_id INTEGER NOT NULL REFERENCES cars(id),
  seller INTEGER REFERENCES staff(id),
  sold_date DATE NOT NULL,
  sold_price INTEGER NOT NULL
);
