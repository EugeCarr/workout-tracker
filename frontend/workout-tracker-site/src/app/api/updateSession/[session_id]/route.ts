"use server"
import { POST_CREATE_SESSION, SITE_DOMAIN_NAME } from "../../../config";
import { myFetch } from "../../fetchWrapper";
import { getAccessTokenServer } from "../../getAccessTokenServer";


export const PUT = async (
    request: Request,
    {params}: {params: {session_id: number}}
    ) =>{
        const body = await request.json()

        const createSessionsURL = SITE_DOMAIN_NAME + POST_CREATE_SESSION + "/" + params.session_id;   
        const accessToken = await getAccessTokenServer();
        try{
            const sessionsRes = await myFetch(
                createSessionsURL,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken?.value
                        },
                    body: JSON.stringify(body)
                }
            );
            return new Response(
                JSON.stringify(sessionsRes),
                {status: 201}
            )   

        }catch(error){
            console.log(error)
            return new Response(
                JSON.stringify(error),
                {status: 400}
            )  
        }

}