CREATE TABLE invitations(
    id SERIAL PRIMARY KEY,
    invitation_code UUID DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    permission_level VARCHAR(50) DEFAULT 'standard',
    loved_one_id INTEGER REFERENCES loved_ones(id)
);