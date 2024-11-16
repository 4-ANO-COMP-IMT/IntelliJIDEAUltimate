export type Session = {
    session_id: number;
    user_id: number;
    session_token: string;
    session_expiry: Date;
  };

/* 
CREATE TABLE sessions (
  session_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  session_expiry TIMESTAMP NOT NULL
);
*/