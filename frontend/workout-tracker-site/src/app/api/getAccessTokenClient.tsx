"use client"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getRefreshedAccessToken } from "./refreshToken";
import { getTokenExpiryTime } from "../utils";
import { getCookie, setCookie } from "cookies-next";

export const getAccessTokenClient = async () : Promise<string| undefined> => {
    // let cookies: (Cookies| undefined)  = useCookies();
    // console.log(cookies);
    const refreshToken: (string| undefined)  = getCookie("refreshToken");
    let accessToken: (string| undefined)  = getCookie("authToken");
    const FIVE_MINS_TIME = getTokenExpiryTime();
    if (!accessToken){
        // console.log("refreshing access token")
        const newAccessToken: string = await getRefreshedAccessToken(refreshToken);
        setCookie('authToken', newAccessToken, {secure: true, expires: FIVE_MINS_TIME} )
        accessToken = getCookie("authToken")
        return accessToken
    }
    // console.log("access token in cookie")
    return accessToken
}