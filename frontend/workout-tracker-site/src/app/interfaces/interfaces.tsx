export interface signupDetails {
    username: string;
    password: string;
    re_password: string;
}

export interface loginDetails {
    username: string;
    password: string;
}

export interface authDetails {
    username?: string,
    authToken?: string,
    refreshToken?: string,
    first_name?: string,
}