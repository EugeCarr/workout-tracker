"use client"
import  "../styles.css";
import React, { FC, useState} from "react";
import { useRouter } from "next/navigation";
import { signupDetails} from "../interfaces/interfaces";
import { loginUser } from "../api/login";
import CreateUserForm from "./CreateUserForm";

export const SignupFormTrainer: FC = (): React.ReactNode => {    
    const [signup, setSignup] = useState<signupDetails>({} as signupDetails);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [badSignup, setBadSignup] = useState<string>("");
    const homePageRouter = useRouter();

    const submitAction =  async (): Promise<void>=> {
        const {password, re_password} = signup;
        if(password !==re_password){
            setErrorMessages([
                ...errorMessages,
                "Password and confirm Password do not match."
            ]);
            return
        }else{
            try{
                const newTrainerUserRes: Response = await fetch(
                    "/api/createUserTrainer",
                    {
                        method: "POST",
                        body: JSON.stringify(signup)
                    }
                );
                const newTrainer = await newTrainerUserRes.json();
                const login = await loginUser({
                    email: newTrainer.email,
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <CreateUserForm
                buttonAction={submitAction}
                formTitle="Create New Trainer"
                buttonText="Create Account"
                signup={signup}
                setSignUp={setSignup}
                errorMessages={errorMessages}
                badSignup={badSignup}
            />
        </div>
    )
};