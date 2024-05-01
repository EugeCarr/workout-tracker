"use client"
import  "../styles.css";
import React, { FC, useState} from "react";
import { useRouter } from "next/navigation";
import { signupDetails} from "../interfaces/interfaces";
import { loginUser } from "../api/login";
import CreateUserForm from "./CreateUserForm";
import { createUserTrainer } from "../api/signupTrainer";

export const SignupFormTrainer: FC = (): React.ReactNode => {    
    const [signup, setSignup] = useState<signupDetails>({} as signupDetails);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [badSignup, setBadSignup] = useState<string>("");
    const homePageRouter = useRouter();

    const submitAction =  async (): Promise<void>=> {
        console.log(signup);
        const {password, re_password} = signup;
        if(password !==re_password){
            setErrorMessages([
                ...errorMessages,
                "Password and confirm Password do not match."
            ]);
            return
        }else{
            try{
                const signUpDetails = await createUserTrainer(signup);
                const login = await loginUser({
                    email: signUpDetails.email || "",
                    password: signup.password
                });
                homePageRouter.push('../')
                return
            }catch(error){
                console.log(error)
                setBadSignup("Login Failed. Please enter a correct username and password.")
                return
            }             
        
        }
    };

    return (
        <CreateUserForm
            buttonAction={submitAction}
            formTitle="Create New Trainer"
            buttonText="Create Account"
            signup={signup}
            setSignUp={setSignup}
            errorMessages={errorMessages}
            badSignup={badSignup}
        />
    )
};