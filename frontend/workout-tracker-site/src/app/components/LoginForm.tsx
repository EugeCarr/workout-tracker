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
import { loginDetails, signupDetails } from "../interfaces/interfaces";
import { loginUser } from "../api/login";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { authDetails } from "../interfaces/interfaces";
import Link from "next/link";



const LoginForm = (): React.ReactNode => {
    const {authDetails, setAuthDetails} = useAuthenticationContext();
    
    const [login, setLogin] = useState<loginDetails>({
        email: "",
        password: "",
    });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [badLogin, setBadLogin] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setLogin(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    };
    const homePageRouter = useRouter()

    const buttonAction =  async () => {
        const {password} = login;
        const loginResponse = await loginUser(login);
        setAuthDetails(
            {
                email: loginResponse?.email,
                authToken: loginResponse?.authToken,
                refreshToken: loginResponse?.refreshToken,
            }
        );
        if(!loginResponse?.email){
            setBadLogin("Login Failed. Please enter a correct username and password.")
            return
        }
        homePageRouter.push('../')       
        
    };

    return (
        <div
            className="login-card"           
        >
            <p className="title">Login to site</p>
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
                name="username"
                type="text"
                className="login-input"
                value={login.email}
                onChange = {handleChange}
                placeholder="Username"

            />
            <input
                name="password"
                type="text"
                className="login-input"
                value={login.password}
                onChange = {handleChange}
                placeholder="Password"

            />
            {
                !!badLogin && <p className="formErrorMessage">{badLogin}</p>
            }
            <button
                name="login-button"
                className="login-button"
                disabled={!errorMessages && !login.email || !login.password}
                onClick={buttonAction}
                // style={"height:1.5remwidth:3rem"}
            >Log in</button>
            <Link href="/signup">
                <p>No acccount? Sign up</p>
            </Link>
            
        </div>
    )
}

export default LoginForm