"use server";
import { GET_MUSCLE_GROUPS_ENDPOINT, BACKEND_DOMAIN_NAME } from "../../config";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenServer } from "../getAccessTokenServer";

export const GET = async (request: Request)=>
    {
    const fetchMuscleGroupsURL = BACKEND_DOMAIN_NAME + GET_MUSCLE_GROUPS_ENDPOINT;
    const accessToken = await getAccessTokenServer();
    try{
        const muscleGroupsRes = await myFetch(
            fetchMuscleGroupsURL,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken?.value
                    },
            }
        );
        return new Response(
            JSON.stringify(muscleGroupsRes),
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