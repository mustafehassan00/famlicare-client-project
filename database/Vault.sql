CREATE TABLE vault(
    id SERIAL PRIMARY KEY,
    loved_one_id INTEGER REFERENCES loved_ones(id),
    document_name VARCHAR(100),
    document_type VARCHAR(100),
    uploaded_timestamp TIMESTAMP DEFAULT NOW(),
    file_size INTEGER,
    attachment_URL VARCHAR(255) --holds URL to document storage
);
