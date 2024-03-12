"use server";
import { GET_MULTIPLE_USERS_ENDPOINT, SITE_DOMAIN_NAME } from "../config";
import { myFetch } from "./fetchWrapper";
import { getAccessTokenServer } from "./getAccessTokenServer";
import { userAccount } from "../interfaces/interfaces";

export const getUsers = async (is_client: Boolean): Promise<userAccount[]> =>{
    let fetchUserURL = SITE_DOMAIN_NAME + GET_MULTIPLE_USERS_ENDPOINT;
    if(is_client){
        fetchUserURL = fetchUserURL + "?is_client=1"
    }else{
        fetchUserURL = fetchUserURL + "?is_client=0"
    }

    const accessToken = await getAccessTokenServer();
    try{
        const userRes = await myFetch(
            fetchUserURL,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken?.value
                    },
            }
        );
        return userRes

    }catch(error){
        console.log(error)
        return []
    }

}