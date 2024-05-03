"use server"
import { BACKEND_DOMAIN_NAME, POST_CREATE_SESSION_EXERCISE } from "../../../config";
import { getAccessTokenServer } from "../../getAccessTokenServer";


export const DELETE = async (
    request: Request,
    {params}: {params: {exercise_id: number}}
    ) =>{
        const deleteExerciseURL = BACKEND_DOMAIN_NAME + POST_CREATE_SESSION_EXERCISE + "/" + params.exercise_id;   
        const accessToken = await getAccessTokenServer();
        try{
            const exerciseRes = await fetch(
                deleteExerciseURL,
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