"use server"
import { GET_EXERCISE_TYPES_ENDPOINT, BACKEND_DOMAIN_NAME } from "../../config";
import { myFetch } from "../fetchWrapper";
import { getAccessTokenServer } from "../getAccessTokenServer";


export const GET = async (request: Request) => {
        let fetchExerciseTypesURL = BACKEND_DOMAIN_NAME + GET_EXERCISE_TYPES_ENDPOINT 
        console.log(fetchExerciseTypesURL)
        const accessToken = await getAccessTokenServer();
        
        try{
            const response = await myFetch(
                fetchExerciseTypesURL,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken?.value
                        },
                }
            );
            return new Response(
                JSON.stringify(response),
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