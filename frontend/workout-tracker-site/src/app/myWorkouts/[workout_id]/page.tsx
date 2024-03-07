import { getWorkOutPlans } from "@/app/api/getWorkoutplans";
import { WorkoutDisplayCard } from "@/app/components/WorkoutDisplayCard";
import React, { FC } from "react";
import { workoutPlan } from "@/app/interfaces/interfaces";

interface Props  {
    params: any
}

export const ViewWorkoutPlan: FC<Props> = async ({params}): Promise<any> => {
    const {workout_id} = params
    console.log(workout_id)

    const getSinglePlan = async(workout_id: number): Promise<workoutPlan[]> => {
        const workoutPlans: (workoutPlan[]) = await getWorkOutPlans(workout_id);
        return workoutPlans
    };
    const workoutPlan = await getSinglePlan(workout_id);
    console.log(workoutPlan)

    // const planComps = plans.map((wPlan)=> <WorkoutDisplayCard workoutPlan={wPlan} key={wPlan.id}/>)
    return (
        // {
        //     workoutPlan.map((wPlan)=> {
        //         return (
        //             <WorkoutDisplayCard workoutPlan={wPlan} key={wPlan.id}/>
                    
        //         )
        //     })
        // }
        <WorkoutDisplayCard workoutPlan={workoutPlan}/>
    )
}

export default ViewWorkoutPlan