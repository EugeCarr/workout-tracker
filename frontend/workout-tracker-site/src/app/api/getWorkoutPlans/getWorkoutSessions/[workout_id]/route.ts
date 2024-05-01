"use server"
import { GET_SESSIONS_ENDPOINT, BACKEND_DOMAIN_NAME } from "../../../../config";
import { myFetch } from "../../../fetchWrapper";
import { getAccessTokenServer } from "../../../getAccessTokenServer";


export const GET = async (
    request: Request,
    {params}: {params: {workout_id?: number}}
    )=>{
        let fetchplansURL = BACKEND_DOMAIN_NAME + GET_SESSIONS_ENDPOINT + "?workoutPlan_id=" + params.workout_id

        const accessToken = await getAccessTokenServer();

        try{
            const sessionsRes = await myFetch(
                fetchplansURL,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken?.value
                        },
                }
            );
            return new Response(
                JSON.stringify(sessionsRes),
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