"use server"
import { POST_CREATE_EXERCISE_TYPES, SITE_DOMAIN_NAME } from "../../config";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenServer } from "../getAccessTokenServer";


export const POST = async (
    request: Request,
    ) =>{
        const body = await request.json()

        const createExerciseTypeURL = SITE_DOMAIN_NAME + POST_CREATE_EXERCISE_TYPES;   
        const accessToken = await getAccessTokenServer();
        try{
            const exerciseRes = await myFetch(
                createExerciseTypeURL,
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
                JSON.stringify(exerciseRes),
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