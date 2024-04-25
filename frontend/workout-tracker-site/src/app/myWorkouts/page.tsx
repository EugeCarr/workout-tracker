"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";
import { getUsers } from "../api/getUsers";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import { userAgent } from "next/server";
import { cookies } from "next/headers";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { Suspense } from "react";


export const WorkoutPlans = async (): Promise<any> => {
    
    return (
            <div
                style={{
                    height: "100%"
                }}
            >
                <WorkoutPlanGrid />
            </div>
        
    )
}

export default WorkoutPlans