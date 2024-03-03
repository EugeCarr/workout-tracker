"use server";
import { loginDetails, authDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH, GET_TOKEN_ENDPOINT} from "../config.js";

export const createUser = async (loginDetails: loginDetails) => {

    const fetchURL = SITE_DOMAIN_NAME + CREATE_USER_ENDPOINT_REL_PATH;
    const fetchTokenURL = SITE_DOMAIN_NAME + GET_TOKEN_ENDPOINT;
    // console.log(fetchURL);
    try{
        const response = await fetch(
            fetchURL,
            {
                method: "POST",
                body: JSON.stringify(loginDetails),
                headers: {
                "Content-Type": "application/json",
                },
            },        
        );
        const resBody = await response.json();
        // console.log(response);
        // console.log(resBody);
        const tokenResponse = await fetch(
            fetchTokenURL,
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: loginDetails.username,
                        password: loginDetails.password
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
            
        );
        const tokenResBody = await tokenResponse.json();
        // console.log(tokenResBody);
        return {
            username: loginDetails.username,
            authToken: tokenResBody["auth_token"],
        }
    }catch(error) {
        console.log(error)
        return null
    }
}