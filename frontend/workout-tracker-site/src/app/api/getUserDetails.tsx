"use server";
import { GET_USER_ENDPOINT, BACKEND_DOMAIN_NAME } from "../config";
import { cookies } from "next/headers";
import { myFetch } from "./fetchWrapper";
import { getAccessTokenServer } from "./getAccessTokenServer";

export const getUserDetails = async (): Promise<void> =>{
    const fetchUserURL = BACKEND_DOMAIN_NAME + GET_USER_ENDPOINT;


    const accessToken = await getAccessTokenServer()
    // console.log(accessToken)
    try{
        const userRes = await myFetch(
            fetchUserURL,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken?.value
                },
            }
        );

        cookies().set({name: 'email', value: userRes[0]["email"], httpOnly: true})
        cookies().set({name: 'first_name', value: userRes[0]["first_name"], httpOnly: true})
        cookies().set({name: 'last_name', value: userRes[0]["last_name"], httpOnly: true})
        return

    }catch(error){
        console.log(error)
        return 
    }

}