export type User = {
  is_admin: boolean;
  user_id: number;
  username: string;
  password: string;
};

// CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     is_admin BOOLEAN NOT NULL
// );

export class NewUser{
  private username: string;
  private password: string;
  private is_admin: boolean = false;
  
  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }

  public getUsername(): string{
    return this.username;
  }

  public getPassword(): string{
    return this.password;
  }

  public getIsAdmin(): boolean{
    return this.is_admin;
  }
}