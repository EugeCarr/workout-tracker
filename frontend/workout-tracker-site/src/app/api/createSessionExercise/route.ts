"use server"
import { POST_CREATE_SESSION_EXERCISE, BACKEND_DOMAIN_NAME } from "../../config";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenServer } from "../getAccessTokenServer";


export const POST = async (
    request: Request,
    ) =>{
        const body = await request.json()

        const createExercisesURL = BACKEND_DOMAIN_NAME + POST_CREATE_SESSION_EXERCISE;   
        const accessToken = await getAccessTokenServer();
        try{
            const exercisesRes = await myFetch(
                createExercisesURL,
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
                JSON.stringify(exercisesRes),
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