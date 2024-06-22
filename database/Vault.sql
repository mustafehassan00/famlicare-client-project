CREATE TABLE vault (
    id SERIAL PRIMARY KEY,
    loved_one_id INTEGER NOT NULL REFERENCES loved_ones(id),
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    uploaded_timestamp TIMESTAMP DEFAULT NOW(),
    file_size INTEGER CHECK (file_size > 0),
    attachment_URL VARCHAR(2048) NOT NULL, 
    CONSTRAINT valid_document_type CHECK (document_type IN ('pdf', 'jpeg', 'png', 'gif', 'txt', 'html', 'markdown', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'))
);

-- Indexes for performance improvement
CREATE INDEX idx_loved_one_id ON vault(loved_one_id);
CREATE INDEX idx_uploaded_timestamp ON vault(uploaded_timestamp);
