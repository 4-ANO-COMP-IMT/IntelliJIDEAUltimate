CREATE TABLE IF NOT EXISTS sessions (
	session_id serial PRIMARY KEY,
	user_id INT NOT NULL,
	session_token VARCHAR(255) UNIQUE NOT NULL,
	session_expiry TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS rectangles (
	rectangle_id serial PRIMARY KEY,
	image_id INTEGER NOT NULL,
	class_name VARCHAR(40) NOT NULL,
	center_x NUMERIC NOT NULL,
	center_y NUMERIC NOT NULL,
	WIDTH NUMERIC NOT NULL,
	HEIGHT NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS allocation_images (
	image_id serial PRIMARY KEY,
	image_url VARCHAR(200) NOT NULL,
	classification_status VARCHAR(50) DEFAULT 'pending',
	user_id INTEGER DEFAULT NULL,
	timestamp_reservation TIMESTAMP DEFAULT NULL,
	timestamp_classification TIMESTAMP DEFAULT NULL
);