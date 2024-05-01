"use server";
import { cookies } from 'next/headers'
import { signupDetails } from "../../interfaces/interfaces";
import {SITE_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH, GET_TOKEN_ENDPOINT} from "../../config.js";
import { myFetch } from ".././fetchWrapper";


export const POST = async (request: Request) => {

    const body: signupDetails = await request.json();

    const fetchURL = SITE_DOMAIN_NAME + CREATE_USER_ENDPOINT_REL_PATH;
    const fetchTokenURL = SITE_DOMAIN_NAME + GET_TOKEN_ENDPOINT;
    try{
        const response = await myFetch(
            fetchURL,
            {
                method: "POST",
                body: JSON.stringify(body),
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
                        email: body.email,
                        password: body.password
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
            
        );
        
        return new Response(
            JSON.stringify({
                email: body.email,
                authToken: tokenResponse["access"],
                refreshToken: tokenResponse["refresh"],
                first_name: body.first_name,
                last_name: body.last_name,
            }),
            {status:201}   
        )       
    } catch(error){
        console.log(error)
        return new Response(
            JSON.stringify(error),
            {status: 400}
        )  
    }
}