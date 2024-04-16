"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";
import { getUsers } from "../api/getUsers";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import { userAgent } from "next/server";
import { cookies } from "next/headers";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { Suspense } from "react";


export const WorkoutPlans = async (): Promise<any> => {
    // const clientsRes = await fetch(
    //     `http://localhost:3000/api/getUsers/1`
    // );   
    // console.log(clientsRes)
    // const clients = await clientsRes.json();

    // const trainersRes = await fetch(
    //     `http://localhost:3000/api/getUsers/0`
    // );   
    // const trainers = await trainersRes.json();

    // const clients: userAccount[] = await getUsers(true); 
    // const trainers: userAccount[] = await getUsers(false);
    
    return (
            // <WorkoutPlanGrid trainerUsers={trainers} clientUsers={clients} />
            <WorkoutPlanGrid />
        
    )
}

export default WorkoutPlans