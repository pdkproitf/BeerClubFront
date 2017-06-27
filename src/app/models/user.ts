import { Role } from './role';
export class User {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    id: Number;
}
export class UserPost {
    user: User;
}
