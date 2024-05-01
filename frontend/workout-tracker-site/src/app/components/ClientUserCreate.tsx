"use client";
import { signupDetails } from "../interfaces/interfaces";
import React, { FC } from "react";
import CreateUserForm from "./CreateUserForm";
import { useState} from "react";
import { createUserClient } from "../api/signup";

interface Props {
    counterFunction: ()=> void;
}

export const ClientUserCreate: FC<Props> = ({ counterFunction}): React.ReactNode => {
    const [newClientUser, setNewClientUser] = useState<signupDetails>({} as signupDetails);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [badSignup, setBadSignup] = useState<string>("");

    const submitAction =  async (): Promise<void>=> {
        console.log(newClientUser);
        const {password, re_password} = newClientUser;
        if(password !==re_password){
            setErrorMessages([
                ...errorMessages,
                "Password and confirm Password do not match."
            ]);
            return
        }else{
            try{
                const newUserRes: Response = await fetch(
                    "/api/createUserClient",
                    {
                        method: "POST",
                        body: JSON.stringify(newClientUser)
                    }
                );
                const writtenExerciseType = await newUserRes.json();
                setNewClientUser({}as signupDetails)
                counterFunction();
                return
            }catch(error){
                console.log(error)
                setBadSignup("Login Failed. Please enter a correct username and password.")
                return
            }             
        
        }
    };
    console.log({newClientUser})

    return (
        <CreateUserForm
            buttonAction={submitAction}
            formTitle="Create New Client"
            buttonText="Create Client"
            signup={newClientUser}
            setSignUp={setNewClientUser}
            errorMessages={errorMessages}
            badSignup={badSignup}
        />
    )
}