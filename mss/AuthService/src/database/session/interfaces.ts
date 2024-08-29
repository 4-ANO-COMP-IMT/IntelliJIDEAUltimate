// TypeScript type definition for a session
export type Session = {
    session_id: number;
    user_id: number;
    session_token: string;
    session_expiry_date: Date;
  };