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

export interface mainPageCardDetails {
    title: string,
    photoSrc: string,
    description: string,
    pageRoute: string
}

export interface session {
    id: number;
    workoutPlan_id: number;
    name: string;
    plannedDate: Date;
    completedDate: Date;
    description: string
}

export interface workoutPlan {
    id: number;
    client_id: number;
    trainer_id: number;
    name: string;
    sessions?: session[];
}