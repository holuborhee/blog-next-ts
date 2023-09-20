export {}

declare global {
  interface IPost {
    id: string;
    created_at: string;
    updated_at: string;
    user: number;
    body: string;
    title: string;
  }

  interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string
  }
}