"use server"
import { GET_EXERCISES_ENDPOINT, SITE_DOMAIN_NAME } from "../../../config";
import { myFetch } from "../../fetchWrapper";
import { getAccessTokenServer } from "../../getAccessTokenServer";


export const GET = async (
    request: Request,
    {params}: {params: {session_id?: number}}
    )=>{
        let fetchplansURL = SITE_DOMAIN_NAME + GET_EXERCISES_ENDPOINT + "?session_id=" + params.session_id

        const accessToken = await getAccessTokenServer();

        try{
            const exercisesRes = await myFetch(
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
                JSON.stringify(exercisesRes),
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