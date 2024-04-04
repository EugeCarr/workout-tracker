"use client"
import { getWorkOutPlans } from "@/app/api/getWorkoutplans";
import { WorkoutDisplayCard } from "@/app/components/WorkoutDisplayCard";
import React, { FC, Suspense, useState, useEffect} from "react";
import { workoutPlan } from "@/app/interfaces/interfaces";

interface Props  {
    params: any
}

export const ViewWorkoutPlan: FC<Props> = ({params}) => {
    const {workout_id} = params
    console.log({workout_id})
    const [plan, setPlan] = useState<workoutPlan>({} as workoutPlan)

    useEffect(
        () => {
            const getWPlan = async (): Promise<void> => {
                console.log("Getting selected plan")
                console.log(`/api/getWorkoutPlans`)
                const planResponse = await fetch(
                    `http://localhost:3000/api/getWorkoutPlans/${workout_id}`
                );                
                const queriedPlan = await planResponse.json()
                console.log({queriedPlan})
                setPlan(queriedPlan)
                
                return
            };
            console.log({plan})
            getWPlan();
            return 
        }, []
    );
    return (
        <Suspense>
            <WorkoutDisplayCard workoutPlan={plan} key={plan.id}/>
        </Suspense>
        
    )
}

export default ViewWorkoutPlan