"use server";
import { cookies } from "next/headers";
import { authDetails, loginDetails } from "../interfaces/interfaces";
import {BACKEND_DOMAIN_NAME, REFRESH_TOKEN_ENDPOINT} from "../config.js";
import { myFetch, ResponseError } from "./fetchWrapper";
import { getTokenExpiryTime } from "../utils";

export const getRefreshedAccessToken = async (refreshToken: string| undefined): Promise<string> => {

    const fetchTokenURL = BACKEND_DOMAIN_NAME + REFRESH_TOKEN_ENDPOINT;

    try{
        const tokenResponse = await myFetch(
            fetchTokenURL,
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        refresh: refreshToken
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
            
        );
        // cookies().set({name: 'authToken', value: tokenResponse["access"], httpOnly: true, expires: FIVE_MINS_TIME })
        return  tokenResponse["access"]         
    }catch(error) {
        console.log(error)
        return ""
    }
}