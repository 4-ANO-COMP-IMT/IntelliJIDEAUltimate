// import { pool } from '../database/connection';
// import { createSessionQuery } from '../database/queries';

// interface UserValidatedEvent {
//   session_id: number;
//   session_token: string;
//   validation_timestamp: string;
//   user_id: number;
// }

// interface UserRegisteredEvent {
//   username: string;
//   password: string;
//   id: number;
//   isAdmin: boolean;
// }

// export const events: Record<string, (arg: any) => Promise<any>> = {
//   userValidatedSuccessfulEvent: async (event: UserValidatedEvent) => {
//     await pool.query(createSessionQuery, [
//       event.session_id,
//       event.session_token,
//       event.validation_timestamp,
//       event.user_id,
//     ]);
//     console.log(`New user authenticated: ${event.session_token}`);
//   },
//   userRegisteredEvent: async (event: UserRegisteredEvent) => {
//     console.log(`New user registered: ${event.username}`);
//   },
// };
