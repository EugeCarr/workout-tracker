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
    setAuthDetails: (arg0: authDetails) => void
}
const AuthenticationContext = createContext<authContextValue | null>(
    {
        authDetails: initialAuth,
         setAuthDetails: ()=>{},
    }
);


export const AuthenticationProvider = ({children}: {children: JSX.Element}) => {
    const [authDetails, setAuthDetails] = useState<authDetails>(initialAuth)

    return (
        <AuthenticationContext.Provider
            value={
                {
                    authDetails,
                    setAuthDetails: (data: authDetails): void => setAuthDetails(data)
                }
            }
        >
            {children}
        </AuthenticationContext.Provider>
    )
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);