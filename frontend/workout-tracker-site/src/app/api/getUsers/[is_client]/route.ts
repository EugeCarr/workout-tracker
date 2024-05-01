"use server";
import { GET_MULTIPLE_USERS_ENDPOINT, BACKEND_DOMAIN_NAME } from "../../../config";
import { myFetch } from "../../fetchWrapper";
import { getAccessTokenServer } from "../../getAccessTokenServer";
import { cookies } from "next/headers";

export const GET = async (
    request: Request,
    {params}: {params: {is_client?: string}}
    )=>
    {
    let fetchUserURL = BACKEND_DOMAIN_NAME + GET_MULTIPLE_USERS_ENDPOINT;
    if(params?.is_client === '1'){
        fetchUserURL = fetchUserURL + "?is_client=1"
    }else{
        fetchUserURL = fetchUserURL + "?is_client=0"
    }
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