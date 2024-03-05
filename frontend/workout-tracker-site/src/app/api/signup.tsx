"use server";
import { signupDetails, authDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH, GET_TOKEN_ENDPOINT} from "../config.js";
import { myFetch, ResponseError } from "./fetchWrapper";

export const createUser = async (signupDetails: signupDetails): Promise<authDetails| null> => {

    const fetchURL = SITE_DOMAIN_NAME + CREATE_USER_ENDPOINT_REL_PATH;
    const fetchTokenURL = SITE_DOMAIN_NAME + GET_TOKEN_ENDPOINT;
    // console.log(fetchURL);
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
                        username: signupDetails.username,
                        password: signupDetails.password
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
            
        );
        return {
            username: signupDetails.username,
            authToken: tokenResponse["access"],
            refreshToken: tokenResponse["refresh"],
        };             
    }catch(error) {
        console.log(error)
        return null
    }
}