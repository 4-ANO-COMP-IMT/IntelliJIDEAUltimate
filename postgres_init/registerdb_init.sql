CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
	session_id serial PRIMARY KEY,
	user_id INT NOT NULL,
	session_token VARCHAR(255) UNIQUE NOT NULL,
	session_expiry TIMESTAMP NOT NULL
);

INSERT INTO users (username, password, is_admin)
    SELECT 'admin', 'admin', TRUE
    WHERE NOT EXISTS (SELECT 1 FROM users);