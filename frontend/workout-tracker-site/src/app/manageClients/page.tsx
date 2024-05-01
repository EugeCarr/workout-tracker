"use client"
import { ClientUserCreate } from "../components/ClientUserCreate";
import { ClientUserTable } from "../components/ClientUsersTable";
import { useState, FC} from "react";

const ClientUserPage: FC = (): React.ReactNode => {
    const [submitCounter, setSubmitCounter] = useState<number>(0);
    return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <ClientUserCreate counterFunction={()=> setSubmitCounter(submitCounter + 1)}/>
                <ClientUserTable counter={submitCounter}/>
            </div>
        
    )
};

export default ClientUserPage