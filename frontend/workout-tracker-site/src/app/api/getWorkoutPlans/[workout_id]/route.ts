"use server"
import { GET_WORKOUTPLANS_ENDPOINT, SITE_DOMAIN_NAME } from "../../../config";
import { myFetch } from "../../fetchWrapper";
// import { getAccessTokenClient } from "./getAccessTokenClient";
import { getAccessTokenServer } from "../../getAccessTokenServer";


export const GET = async (
    request: Request,
    {params}: {params: {workout_id?: number}}
    )=>{
        console.log({params})
        let fetchplansURL = "";
        if(!params?.workout_id){
            fetchplansURL = SITE_DOMAIN_NAME + GET_WORKOUTPLANS_ENDPOINT 
        }else{
            fetchplansURL = SITE_DOMAIN_NAME + GET_WORKOUTPLANS_ENDPOINT + "/" + params.workout_id
        }

        const accessToken = await getAccessTokenServer();

        try{
            const plansRes = await myFetch(
                fetchplansURL,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken?.value,
                        "cache": 'no-store'
                        },
                }
            );
            return new Response(
                JSON.stringify(plansRes),
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