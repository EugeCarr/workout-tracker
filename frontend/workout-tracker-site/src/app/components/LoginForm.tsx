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


const LoginForm = (): React.ReactNode => {
    
    const [login, setLogin] = useState<loginDetails>({
        username: "",
        password: "",
        re_password: "",
    });

    const [loginSuccess, setloginSuccess] = useState<boolean | null>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLogin(
            {
                ...login,
                [e.target.name]: e.target.value
            }
        )
    };

    const buttonAction = (): void => {
        console.log(login)
        const loginResponse = createUser(login);
        console.log(loginResponse)
        
        return 
    };
    return (
        <div
            className="login-card"           
        >
            <p className="title">Login to site</p>
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
                onClick={buttonAction}
            >Log in</button>
        </div>
    )
}

export default LoginForm