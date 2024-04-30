"use client"
import  "../styles.css";
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import { signupDetails, loginDetails} from "../interfaces/interfaces";
import { createUser } from "../api/signup";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { authDetails } from "../interfaces/interfaces";
import Link from "next/link";
import { loginUser } from "../api/login";


const SignupForm = (): React.ReactNode => {    
    const [signup, setSignup] = useState<signupDetails>({} as signupDetails);
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
    const homePageRouter = useRouter();

    const buttonAction =  async (): Promise<void>=> {
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
                const signUpDetails = await createUser(signup);
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
                name="form-button"
                className="form-button"
                disabled={!errorMessages && !signup.email || !signup.password || !signup.re_password}
                onClick={buttonAction}
                // style={"height:1.5remwidth:3rem"}
            >Sign Up</button>
            
        </div>
    )
}

export default SignupForm