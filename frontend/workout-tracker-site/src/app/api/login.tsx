"use server";
import { loginDetails } from "../interfaces/interfaces";
import {SITE_DOMAIN_NAME, CREATE_USER_ENDPOINT_REL_PATH} from "../config.js";

export const createUser = async (loginDetails: loginDetails) => {

    const fetchURL = SITE_DOMAIN_NAME + CREATE_USER_ENDPOINT_REL_PATH
    console.log(fetchURL);
    try{
        const response = await fetch(
            fetchURL,
            {
                method: "POST",
                body: JSON.stringify(loginDetails),
                headers: {
                    "Content-Type": "application/json",
                  },
            },        
        );
        const resBody = await response.json();
        console.log(response);
        console.log(resBody);
        return resBody.results
    }catch(error) {
        console.log(error)
        return {data: undefined}
    }
}