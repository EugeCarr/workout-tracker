"use server"
import { POST_CREATE_SESSION, BACKEND_DOMAIN_NAME } from "../../config";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenServer } from "../getAccessTokenServer";


export const POST = async (
    request: Request,
    ) =>{
        const body = await request.json()

        const createSessionsURL = BACKEND_DOMAIN_NAME + POST_CREATE_SESSION;   
        const accessToken = await getAccessTokenServer();
        try{
            const sessionsRes = await myFetch(
                createSessionsURL,
                {
                    method: "POST",
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