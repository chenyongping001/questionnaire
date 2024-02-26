// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
export enum Role {
  wxuser = 'WXUSER',
  admin = 'ADMIN',
}
interface IUser extends DefaultUser {
  ygdm:string;
  ygmc:string;
  role?: Role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
