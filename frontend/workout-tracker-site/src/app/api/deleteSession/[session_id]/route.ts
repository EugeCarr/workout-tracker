"use server"
import { POST_CREATE_SESSION, BACKEND_DOMAIN_NAME } from "../../../config";
import { myFetch } from "../../fetchWrapper";
import { getAccessTokenServer } from "../../getAccessTokenServer";


export const DELETE = async (
    request: Request,
    {params}: {params: {session_id: number}}
    ) =>{
        const createSessionsURL = BACKEND_DOMAIN_NAME + POST_CREATE_SESSION + "/" + params.session_id;   
        const accessToken = await getAccessTokenServer();
        try{
            const sessionsRes = await fetch(
                createSessionsURL,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken?.value
                        },
                }
            );
            return new Response(
                null,
                {status: 204}
            )   

        }catch(error){
            console.log(error)
            return new Response(
                null,
                {status: 400}
            )  
        }

}