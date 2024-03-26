"use server"
import { POST_CREATE_WORKOUT_PLANS, SITE_DOMAIN_NAME } from "../../config";
import { authDetails, workoutPlan } from "../../interfaces/interfaces";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenClient } from "../getAccessTokenClient";
import { getAccessTokenServer } from "../getAccessTokenServer";


export const POST = async (
    request: Request,
    ) =>{
        const body = await request.json()

        const createPlansURL = SITE_DOMAIN_NAME + POST_CREATE_WORKOUT_PLANS;   
        const accessToken = await getAccessTokenServer();
        try{
            const plansRes = await myFetch(
                createPlansURL,
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
                JSON.stringify(plansRes),
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