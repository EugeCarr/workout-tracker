"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";
import { ClientUserCreate } from "../components/ClientUserCreate";
import { ClientUserTable } from "../components/ClientUsersTable";

export const ClientUserPage = async (): Promise<any> => {
    
    return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <ClientUserCreate />
                <ClientUserTable/>
            </div>
        
    )
};

export default ClientUserPage