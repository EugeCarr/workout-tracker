"use server"
import { GET_WORKOUTPLANS_ENDPOINT, SITE_DOMAIN_NAME } from "../../config";
import { authDetails, workoutPlan } from "../../interfaces/interfaces";
import { myFetch } from "../fetchWrapper";
// import { getAccessTokenClient } from "./getAccessTokenClient";
import { getAccessTokenServer } from "../getAccessTokenServer";


export const GET = async (
    request: Request,
    {params}: {params: {id?: number}}
    )=>{
        let fetchplansURL = "";
        if(!params?.id){
            fetchplansURL = SITE_DOMAIN_NAME + GET_WORKOUTPLANS_ENDPOINT 
        }else{
            fetchplansURL = SITE_DOMAIN_NAME + GET_WORKOUTPLANS_ENDPOINT + "/" + params.id
        }

        const accessToken = await getAccessTokenServer();

        try{
            const plansRes = await myFetch(
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