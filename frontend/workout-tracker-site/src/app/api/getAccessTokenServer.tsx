"use server"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getRefreshedAccessToken } from "./refreshToken";
import { cookies } from "next/headers";
import { getTokenExpiryTime } from "../utils";

export const getAccessTokenServer = async () : Promise<RequestCookie| undefined> => {
    let accessToken: (RequestCookie| undefined)  = cookies().get("authToken")
    const refreshToken: (RequestCookie| undefined)  = cookies().get("refreshToken")
    const FIVE_MINS_TIME = getTokenExpiryTime();
    if (!accessToken?.value){
        // console.log("refreshing access token")
        const newAccessToken = await getRefreshedAccessToken(refreshToken?.value);
        cookies().set({name: 'authToken', value: newAccessToken, httpOnly: true, expires: FIVE_MINS_TIME })
        accessToken = cookies().get("authToken")
        return accessToken
    }
    // console.log("access token in cookie")
    return accessToken
}