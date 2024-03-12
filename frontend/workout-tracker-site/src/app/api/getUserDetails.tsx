"use server";
import { GET_USER_ENDPOINT, SITE_DOMAIN_NAME } from "../config";
import { cookies } from "next/headers";
import { myFetch } from "./fetchWrapper";
import { getAccessTokenServer } from "./getAccessTokenServer";

export const getUserDetails = async (): Promise<void> =>{
    const fetchUserURL = SITE_DOMAIN_NAME + GET_USER_ENDPOINT;

    console.log(fetchUserURL)

    const accessToken = await getAccessTokenServer()
    console.log(accessToken)
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

        // check planRes.status to know whether you need to refresh the token or not
        // Now I need to reset the cookies to get the username and name values
        cookies().set({name: 'email', value: userRes[0]["email"], httpOnly: true})
        cookies().set({name: 'first_name', value: userRes[0]["first_name"], httpOnly: true})
        cookies().set({name: 'last_name', value: userRes[0]["last_name"], httpOnly: true})
        return 

    }catch(error){
        console.log(error)
        return 
    }

}