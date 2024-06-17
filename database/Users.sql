CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "password" VARCHAR(60) NOT NULL,
    phone_number VARCHAR(20),
    profile_picture_url VARCHAR(255),
    loved_one_ID INT REFERENCES loved_ones(id),
    is_admin BOOLEAN
);
