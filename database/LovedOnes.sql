CREATE TABLE loved_ones(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    age INTEGER,
    main_condition TEXT,
    street_address VARCHAR(255),
    street_address2 VARCHAR(255),
    city VARCHAR(255),
    state_province VARCHAR(255),
    country VARCHAR(255),
    postal_code VARCHAR(100)
);