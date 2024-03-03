"use client"
import  "../styles.css";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Button,
    Input
} from "@chakra-ui/react";
import React, { useState, useEffect} from "react";
import { loginDetails } from "../interfaces/interfaces";
import { createUser } from "../api/login";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { authDetails } from "../interfaces/interfaces";


const LoginForm = (): React.ReactNode => {
    const {authDetails: authDetails, setAuthDetails} = useAuthenticationContext();
    
    const [login, setLogin] = useState<loginDetails>({
        username: "",
        password: "",
        re_password: "",
    });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [loginSuccess, setloginSuccess] = useState<boolean | null>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setLogin(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    };

    const buttonAction =  async () => {
        const {password, re_password} = login;
        if(password !==re_password){
            setErrorMessages([
                ...errorMessages,
                "Password and confirm Password do not match."
            ])
            return
        }else{
            const loginResponse = await createUser(login);
            setAuthDetails(
                {
                    username: loginResponse?.username,
                    authToken: loginResponse?.authToken,
                    refreshToken: loginResponse?.refreshToken,
                }
            );
            console.log(loginResponse)
            return 
        }        
        
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
                value={login.username}
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
            <input
                name="re_password"
                type="text"
                className="login-input"
                value={login.re_password}
                onChange = {handleChange}
                placeholder="Confirm Password"

            />
            <button
                name="login-button"
                className="login-button"
                disabled={!errorMessages && !login.username || !login.password || !login.re_password}
                onClick={buttonAction}
            >Log in</button>
        </div>
    )
}

export default LoginForm