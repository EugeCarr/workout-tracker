"use server"
import { GET_WORKOUTPLANS_ENDPOINT, SITE_DOMAIN_NAME } from "../config";
import { authDetails, workoutPlan } from "../interfaces/interfaces";
import { myFetch } from "./fetchWrapper";
// import { getAccessTokenClient } from "./getAccessTokenClient";
import { getAccessTokenServer } from "./getAccessTokenServer";
export const getWorkOutPlans = async (id?: number): Promise<workoutPlan[]> =>{
    let fetchplansURL = "";
    if(!id){
        fetchplansURL = SITE_DOMAIN_NAME + GET_WORKOUTPLANS_ENDPOINT 
    }else{
        fetchplansURL = SITE_DOMAIN_NAME + GET_WORKOUTPLANS_ENDPOINT + "/" + id
    }
    const accessToken = await getAccessTokenServer();

    try{
        const plansRes = await myFetch(
            fetchplansURL,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                    },
            }
        );

        // check planRes.status to know whether you need to refresh the token or not
        return plansRes

    }catch(error){
        console.log(error)
        return []
    }

}