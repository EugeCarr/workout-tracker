"use client"
import  "../styles.css";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Button,
    Input
} from "@chakra-ui/react";
import { useState, useEffect} from "react";
const LoginForm = () => {
    interface loginDetails {
        username: string;
        password: string;
    }
    const [login, setLogin] = useState<loginDetails>({
        username: "",
        password: ""
    })

const buttonAction = () => {
    console.log(login)
}
    return (
        <div
            className="login-card"           
        >
            <p className="title">Login to site</p>
            <FormControl>
                <FormLabel htmlFor="username" color="white">Username</FormLabel>
                <Input
                    onChange={(e)=> {
                        setLogin({
                            ...login,
                            username: e.target.value
                        })
                    }}
                    name="username"
                    id="username"
                    value={login.username}
                    isRequired={true}
                    size="lg"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password" color="white">Password</FormLabel>
                <Input
                    onChange={(e)=> {
                        setLogin({
                            ...login,
                            password: e.target.value
                        })
                    }}
                    name="password"
                    id="password"
                    value={login.password}
                    isRequired={true}
                />
            </FormControl>
            <Button
                color="white"
                textColor={"green"}
                onClick={
                    async (e) => {
                        buttonAction()
                    }
                }
            >Log in </Button>
        </div>
    )
}

export default LoginForm