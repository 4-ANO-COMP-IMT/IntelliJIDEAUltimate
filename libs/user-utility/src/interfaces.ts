export type User = {
  is_admin: boolean;
  user_id: number;
  username: string;
  password: string;
};

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