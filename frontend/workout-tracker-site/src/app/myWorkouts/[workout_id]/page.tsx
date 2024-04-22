"use client"
import { getWorkOutPlans } from "@/app/api/getWorkoutplans";
import { WorkoutDisplayCard } from "@/app/components/WorkoutDisplayCard";
import React, { FC, Suspense, useState, useEffect} from "react";
import { workoutPlan, session } from "@/app/interfaces/interfaces";
import { SessionTable } from "@/app/components/SessionTable";
import { SessionModal } from "@/app/components/SessionModal";

interface Props  {
    params: any
}

export const ViewWorkoutPlan: FC<Props> = ({params}) => {
    const {workout_id} = params
    const [plan, setPlan] = useState<workoutPlan>({} as workoutPlan)
    const [selectedSession, setSelectedSession] = useState<session>({} as session)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [queriedSessions, setQueriedSessions] = useState<session[]>([] as session[])

    useEffect(
        () => {
            const getWPlan = async (): Promise<void> => {
                const planResponse = await fetch(
                    `http://localhost:3000/api/getWorkoutPlans/${workout_id}`
                );                
                const queriedPlan = await planResponse.json()
                setPlan(queriedPlan)
                
                return
            };
            getWPlan();
            return 
        }, []
    );
    
    console.log({plan})
    return (
        <Suspense>
            <WorkoutDisplayCard workoutPlan={plan} key={plan.id}/>
            <SessionTable workoutPlanId={plan.id || 0} setIsModalOpen={setIsModalOpen} setSelectedSession={setSelectedSession} sessions={queriedSessions}/>
            {isModalOpen && <SessionModal closeModal={()=> setIsModalOpen(false)} session={selectedSession}/>}
        </Suspense>
        
    )
}

export default ViewWorkoutPlan