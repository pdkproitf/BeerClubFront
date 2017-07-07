import { Role } from './role';
export class User {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    id: number;
    admin_mode: boolean;
    token: string;
    client: string;
}
export class UserPost {
    user: User;
}
