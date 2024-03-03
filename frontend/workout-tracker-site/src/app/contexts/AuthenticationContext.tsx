"use client"
import { createContext, useState, useContext } from "react";
import { PropsWithMandChildren } from "../types/types";
import { authDetails } from "../interfaces/interfaces";
 const initialAuth: authDetails = {
    username: "",
    authToken: "",
    refreshToken: ""
}

export type authContextValue = {
    authDetails: authDetails,
    setAuthDetails: React.Dispatch<authDetails>
}
const authContext = createContext<authContextValue | null>(null);


export const AuthProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [authDetails, setAuthDetails] = useState<authDetails>(initialAuth)

    return (
        <authContext.Provider
            value={
                {
                    authDetails,
                    setAuthDetails: (data: authDetails): void => setAuthDetails(data)
                }
            }
        >
            {children}
        </authContext.Provider>
    )
};

export const useAuthenticationContext = () => {
    const context = useContext(authContext);
    if(!context){throw Error("useAuthenticationContext can only be used inside an AuthProvider")}
    return context
};