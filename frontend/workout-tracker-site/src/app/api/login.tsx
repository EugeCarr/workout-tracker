"use server";
import { authDetails, loginDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH, GET_TOKEN_ENDPOINT} from "../config.js";
import { myFetch, ResponseError } from "./fetchWrapper";

export const loginUser = async (loginDetails: loginDetails): Promise<authDetails| null> => {

    const fetchTokenURL = SITE_DOMAIN_NAME + GET_TOKEN_ENDPOINT;
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