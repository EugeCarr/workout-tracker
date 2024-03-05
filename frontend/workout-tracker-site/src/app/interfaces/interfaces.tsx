export interface signupDetails {
    email: string;
    password: string;
    re_password: string;
    first_name: string;
    last_name: string
}

export interface loginDetails {
    email: string;
    password: string;
}

export interface authDetails {
    email?: string,
    authToken?: string,
    refreshToken?: string,
    first_name?: string,
    last_name?: string,
}