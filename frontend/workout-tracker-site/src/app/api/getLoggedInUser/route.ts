"use server";
import { GET_MY_USER_ENDPOINT, SITE_DOMAIN_NAME } from "../../config";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenServer } from "../getAccessTokenServer";
import { cookies } from "next/headers";

export const GET = async (
    request: Request,
    )=>
    {
    let fetchUserURL = SITE_DOMAIN_NAME + GET_MY_USER_ENDPOINT;
    const accessToken = await getAccessTokenServer();
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
        return new Response(
            JSON.stringify(userRes),
            {status: 200}
        )   

    }catch(error){
        console.log(error)
        return new Response(
            null,
            {status: 400}
        )    
    }

}