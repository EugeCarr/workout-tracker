"use server";
import { cookies } from 'next/headers'
import { getTokenExpiryTime } from '../../utils';
import { authDetails, signupDetails } from "../../interfaces/interfaces";
import {BACKEND_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH, GET_TOKEN_ENDPOINT, ADD_USER_TO_TRAINERS} from "../../config.js";
import { myFetch } from ".././fetchWrapper";
import { getAccessTokenServer } from '.././getAccessTokenServer';
import { loginUser } from '../login';

export const POST = async (request: Request) => {

    const body: signupDetails = await request.json();

    const createUserURL = BACKEND_DOMAIN_NAME + CREATE_USER_ENDPOINT_REL_PATH;
    const fetchTokenURL = BACKEND_DOMAIN_NAME + GET_TOKEN_ENDPOINT;
    
    const FIVE_MINS_TIME = getTokenExpiryTime()
    try{
        const signupRes = await myFetch(
            createUserURL,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                "Content-Type": "application/json",
                },
            },        
        );

        const loginResponse: authDetails = await loginUser(
            {
                email: body.email,
                password: body.password
            }
        );
        cookies().set({name: 'authToken', value: loginResponse.authToken || "", httpOnly: true, expires: FIVE_MINS_TIME });
        cookies().set({name: 'refreshToken', value: loginResponse.refreshToken|| "", httpOnly: true});
        cookies().set({name: 'email', value: body.email, httpOnly: true});
        cookies().set({name: 'first_name', value: body.first_name, httpOnly: true});
        cookies().set({name: 'last_name', value: body.last_name, httpOnly: true});
        const addUserToTrainerURL = BACKEND_DOMAIN_NAME + ADD_USER_TO_TRAINERS + signupRes?.id;
        const accessToken = await getAccessTokenServer();
        const makeTrainerResponse = await myFetch(
            addUserToTrainerURL,
            {
                method: "PUT",
                body: JSON.stringify(
                    {
                        id: signupRes?.id
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken?.value
                },
            }
        );
        
        return new Response(
            JSON.stringify({
                email: body.email,
                authToken: loginResponse.authToken,
                refreshToken: loginResponse.refreshToken,
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