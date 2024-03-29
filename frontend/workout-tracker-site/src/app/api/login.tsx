"use server";
import { cookies } from 'next/headers'
import { getTokenExpiryTime } from '../utils';
import { authDetails, loginDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, GET_TOKEN_ENDPOINT} from "../config.js";
import { myFetch } from "./fetchWrapper";
import { getUserDetails } from './getUserDetails';

export const loginUser = async (loginDetails: loginDetails): Promise<authDetails| null> => {

    const fetchTokenURL = SITE_DOMAIN_NAME + GET_TOKEN_ENDPOINT;

    const FIVE_MINS_TIME = getTokenExpiryTime();
    cookies().set({name: 'authToken', value: "", httpOnly: true, expires: FIVE_MINS_TIME });
    cookies().set({name: 'refreshToken', value: "", httpOnly: true, expires: FIVE_MINS_TIME });
    // console.log("Pre login")
    // console.log(cookies().get('authToken'))
    try{
        const tokenResponse = await myFetch(
            fetchTokenURL,
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        email: loginDetails.email,
                        password: loginDetails.password
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
            
        );

        cookies().set({name: 'authToken', value: tokenResponse["access"], httpOnly: true, expires: FIVE_MINS_TIME });
        cookies().set({name: 'refreshToken', value: tokenResponse["refresh"], httpOnly: true });
        // console.log("post login")
        // console.log(cookies().get('authToken'))
        getUserDetails()

        return {
            email: loginDetails.email,
            authToken: tokenResponse["access"],
            refreshToken: tokenResponse["refresh"],
        };             
    }catch(error) {
        console.log(error)
        return null
    }
}