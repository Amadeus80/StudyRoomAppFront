export type Roles = "ROLE_ADMIN" | "ROLE_USER";

export interface UserResponse {
    mensaje: string;
    user:    UserClass;
    token:   string;
}

export interface UserClass {
    username:              string;
    email:                 string;
    authorities:           Authority[];
}

export interface Authority {
    authority: Roles;
}

export interface UserCreate{
    email:string;
    username:string;
    password:string;
}

export interface User{
    email:string;
    password:string;
}
