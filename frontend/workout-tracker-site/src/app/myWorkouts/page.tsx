"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";
import { getUsers } from "../api/getUsers";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import { userAgent } from "next/server";
import { cookies } from "next/headers";
import { getWorkOutPlans } from "../api/getWorkoutplans";


export const WorkoutPlans = async (): Promise<any> => {
    const clients: userAccount[] = await getUsers(true); 
    const trainers: userAccount[] = await getUsers(false);
    
    return (
        <WorkoutPlanGrid trainerUsers={trainers} clientUsers={clients} getPlansFunction={getWorkOutPlans}/>
    )
}

export default WorkoutPlans