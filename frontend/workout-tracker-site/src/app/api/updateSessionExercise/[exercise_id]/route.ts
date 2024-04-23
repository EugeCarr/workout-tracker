"use server"
import { POST_CREATE_SESSION_EXERCISE, SITE_DOMAIN_NAME } from "../../../config";
import { myFetch } from "../../fetchWrapper";
import { getAccessTokenServer } from "../../getAccessTokenServer";


export const PUT = async (
    request: Request,
    {params}: {params: {exercise_id: number}}
    ) =>{
        const body = await request.json()
        console.log(request.body)
        const updateExerciseURL = SITE_DOMAIN_NAME + POST_CREATE_SESSION_EXERCISE + "/" + params.exercise_id;   
        const accessToken = await getAccessTokenServer();
        try{
            const exerciseRes = await myFetch(
                updateExerciseURL,
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