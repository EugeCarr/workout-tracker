"use server";
import { cookies } from 'next/headers'
import { getTokenExpiryTime } from '../../utils';
import { authDetails, loginDetails } from "../../interfaces/interfaces";
import {BACKEND_DOMAIN_NAME, GET_TOKEN_ENDPOINT} from "../../config.js";
import { myFetch } from ".././fetchWrapper";
import { getUserDetails } from '.././getUserDetails';

export const GET = async (
    request: Request
    )=> {
    // console.log("Logging user out");
    cookies().delete('authToken');
    cookies().delete('refreshToken');
    cookies().delete('first_name');
    cookies().delete('last_name');
    cookies().delete('email');
    return new Response(
        JSON.stringify({}),
        {status:200}
    )
}