"use server";
import { cookies } from "next/headers";
import { authDetails, loginDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, REFRESH_TOKEN_ENDPOINT} from "../config.js";
import { myFetch, ResponseError } from "./fetchWrapper";
import { getTokenExpiryTime } from "../utils";

export const refreshToken = async (): Promise<void> => {

    const fetchTokenURL = SITE_DOMAIN_NAME + REFRESH_TOKEN_ENDPOINT;
    const refreshToken = cookies().get("refreshToken");
    const FIVE_MINS_TIME = getTokenExpiryTime();

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
        cookies().set({name: 'authToken', value: tokenResponse["access"], httpOnly: true, expires: FIVE_MINS_TIME })
        return            
    }catch(error) {
        console.log(error)
        return
    }
}