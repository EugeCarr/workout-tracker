"use client"
import  "../styles.css";

import React, { useState} from "react";
import { useRouter } from "next/navigation";
import { loginDetails, signupDetails } from "../interfaces/interfaces";
import { loginUser } from "../api/login";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { authDetails } from "../interfaces/interfaces";
import Link from "next/link";



const LoginForm = (): React.ReactNode => {

    
    const [login, setLogin] = useState<loginDetails>({
        email: "",
        password: "",
    });

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
        const loginResponse = await loginUser(login);
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
            <input
                name="email"
                type="text"
                className="login-input"
                value={login.email}
                onChange = {handleChange}
                placeholder="Email"

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
                disabled={!login.email || !login.password}
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