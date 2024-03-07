import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { refreshToken } from "./refreshToken";
import { cookies } from "next/headers";

export const getAccessToken = () : RequestCookie| undefined => {
    let accessToken: (RequestCookie| undefined)  = cookies().get("authToken")

    if (!accessToken){
        console.log("refreshing access token")
        refreshToken()
        accessToken = cookies().get("authToken")
        return accessToken
    }
    console.log("access token in cookie")
    return accessToken
}