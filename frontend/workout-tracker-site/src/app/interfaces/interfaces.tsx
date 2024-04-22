import { Dispatch } from "react";

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
    plannedDate: string;
    completedDate?: string;
    description: string
}

export interface userAccount {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    groups?: string[];
}

export interface workoutPlan {
    id?: number;
    client_id: number;
    trainer_id: number;
    client?: userAccount;
    trainer?: userAccount;
    name?: string;
    sessions?: session[];
}

export interface planChangeAction {
    type: string,
    plans: workoutPlan[]
};

export interface muscleGroup {
    id: number;
    name?: string;
}

export interface exerciseType {
    id?: number;
    name: string;
    description: string;
    muscleGroups: muscleGroup[]
}

