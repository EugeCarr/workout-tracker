"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";
import { getUsers } from "../api/getUsers";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import { userAgent } from "next/server";
import { cookies } from "next/headers";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { Suspense } from "react";


export const WorkoutPlans = async (): Promise<any> => {
    const clients: userAccount[] = await getUsers(true); 
    const trainers: userAccount[] = await getUsers(false);
    
    return (
        <Suspense>
            <WorkoutPlanGrid trainerUsers={trainers} clientUsers={clients} />
        </Suspense>
        
    )
}

export default WorkoutPlans