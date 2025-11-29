-- Create table for API tokens
CREATE TABLE api_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Add index for faster lookup
CREATE INDEX idx_api_tokens_user_id ON api_tokens(user_id);