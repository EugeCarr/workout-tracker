"use server";
import { cookies } from 'next/headers'
import { getTokenExpiryTime } from '../utils';
import { signupDetails, authDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH, GET_TOKEN_ENDPOINT} from "../config.js";
import { myFetch, ResponseError } from "./fetchWrapper";

export const createUserClient = async (signupDetails: signupDetails): Promise<authDetails> => {

    const fetchURL = SITE_DOMAIN_NAME + CREATE_USER_ENDPOINT_REL_PATH;
    const fetchTokenURL = SITE_DOMAIN_NAME + GET_TOKEN_ENDPOINT;
    try{
        const response = await myFetch(
            fetchURL,
            {
                method: "POST",
                body: JSON.stringify(signupDetails),
                headers: {
                "Content-Type": "application/json",
                },
            },        
        );
        console.log(response)
        const tokenResponse = await myFetch(
            fetchTokenURL,
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        email: signupDetails.email,
                        password: signupDetails.password
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
            
        );
        
        return {
            email: signupDetails.email,
            authToken: tokenResponse["access"],
            refreshToken: tokenResponse["refresh"],
            first_name: signupDetails.first_name,
            last_name: signupDetails.last_name,
        };             
    }catch(error) {
        console.log(error)
        return {} as signupDetails
    }
}