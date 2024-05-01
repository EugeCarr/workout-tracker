"use client"
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";
import { ClientUserCreate } from "../components/ClientUserCreate";
import { ClientUserTable } from "../components/ClientUsersTable";
import { useState } from "react";

export const ClientUserPage = async (): Promise<any> => {
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