"use server"
import { POST_CREATE_WORKOUT_PLANS, SITE_DOMAIN_NAME } from "../config";
import { authDetails, workoutPlan } from "../interfaces/interfaces";
import { myFetch } from "./fetchWrapper";
import { getAccessTokenClient } from "./getAccessTokenClient";
import { getAccessTokenServer } from "./getAccessTokenServer";


export const createWorkoutPlans = async (wPlans: workoutPlan): Promise<workoutPlan[]> =>{
    let createPlansURL = SITE_DOMAIN_NAME + POST_CREATE_WORKOUT_PLANS;
    console.log(createPlansURL)

    const accessToken = await getAccessTokenServer();
    // console.log({accessToken});
    // console.log(accessToken?.value);
    // console.log(wPlans)
    try{
        const plansRes = await myFetch(
            createPlansURL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken?.value
                    },
                body: JSON.stringify(wPlans)
            }
        );
        return plansRes

    }catch(error){
        console.log(error)
        return []
    }

}