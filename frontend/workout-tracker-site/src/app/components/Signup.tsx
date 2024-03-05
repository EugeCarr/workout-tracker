"use client"
import  "../styles.css";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Button,
    Input
} from "@chakra-ui/react";
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import { signupDetails } from "../interfaces/interfaces";
import { createUser } from "../api/signup";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { authDetails } from "../interfaces/interfaces";
import Link from "next/link";


const SignupForm = (): React.ReactNode => {
    const {authDetails: authDetails, setAuthDetails} = useAuthenticationContext();
    
    const [signup, setSignup] = useState<signupDetails>({
        email: "",
        password: "",
        re_password: "",
        first_name: "",
        last_name: "",
    });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [badSignup, setBadSignup] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setSignup(
            {
                ...signup,
                [e.target.name]: e.target.value
            }
        )
    };
    const homePageRouter = useRouter()

    const buttonAction =  async () => {
        const {password, re_password} = signup;
        if(password !==re_password){
            setErrorMessages([
                ...errorMessages,
                "Password and confirm Password do not match."
            ])
            return
        }else{
            const loginResponse = await createUser(signup);
            setAuthDetails(
                {
                    email: loginResponse?.email,
                    authToken: loginResponse?.authToken,
                    refreshToken: loginResponse?.refreshToken,
                }
            );
            if(!loginResponse?.email){
                setBadSignup("Login Failed. Please enter a correct username and password.")
                return
            }
            homePageRouter.push('../')
        }        
        
    };

    return (
        <div
            className="login-card"           
        >
            <p className="title">Sign up for account</p>
            {
                !!errorMessages && errorMessages.map(
                    (msg) => {
                        return (
                            React.cloneElement(
                                <p className="formErrorMessage">{msg}</p>
                        ))
                    }
                )
            }
            <input
                name="email"
                type="text"
                className="login-input"
                value={signup.email}
                onChange = {handleChange}
                placeholder="Email Address"

            />
            <input
                name="first_name"
                type="text"
                className="login-input"
                value={signup.first_name}
                onChange = {handleChange}
                placeholder="First Name"

            />
            <input
                name="last_name"
                type="text"
                className="login-input"
                value={signup.last_name}
                onChange = {handleChange}
                placeholder="Last Name"

            />
            <input
                name="password"
                type="text"
                className="login-input"
                value={signup.password}
                onChange = {handleChange}
                placeholder="Password"

            />
            <input
                name="re_password"
                type="text"
                className="login-input"
                value={signup.re_password}
                onChange = {handleChange}
                placeholder="Confirm Password"

            />
            {
                !!badSignup && <p className="formErrorMessage">{badSignup}</p>
            }
            <button
                name="login-button"
                className="login-button"
                disabled={!errorMessages && !signup.email || !signup.password || !signup.re_password}
                onClick={buttonAction}
                // style={"height:1.5remwidth:3rem"}
            >Sign Up</button>
            
        </div>
    )
}

export default SignupForm