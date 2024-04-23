"use client"
import { getWorkOutPlans } from "@/app/api/getWorkoutplans";
import { WorkoutDisplayCard } from "@/app/components/WorkoutDisplayCard";
import React, { FC, Suspense, useState, useEffect} from "react";
import { workoutPlan, session, exercise } from "@/app/interfaces/interfaces";
import { SessionTable } from "@/app/components/SessionTable";
import { SessionModal } from "@/app/components/SessionModal";

interface Props  {
    params: any
}

export const ViewWorkoutPlan: FC<Props> = ({params}) => {
    const {workout_id} = params
    const [plan, setPlan] = useState<workoutPlan>({} as workoutPlan)
    const [selectedSession, setSelectedSession] = useState<session>({} as session)
    const [selectedExercise, setSelectedExercise] = useState<exercise>({} as exercise)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    // const [queriedSessions, setQueriedSessions] = useState<session[]>([] as session[])
    const [sessionsUpdatedCounter, setSessionsUpdatedCounter] = useState<number>(0);
    const [exercisesUpdatedCounter, setExercisesUpdatedCounter] = useState<number>(0);

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
    
    // useEffect(
    //     () => {
    //         const getSessions = async(workoutPlan_id: number): Promise<void> => {
    //             const sessionsRes = await fetch(
    //                 `http://localhost:3000/api/getWorkoutPlans/getWorkoutSessions/${workoutPlan_id}`
    //             )
    //             const qSessions = await sessionsRes.json();
    //             setQueriedSessions(qSessions)
    //             return 
    //         };            
    //         getSessions(workout_id);
    //         return
    //     }, [sessionsUpdatedCounter]
    // );

    // console.log({queriedSessions})
    console.log({sessionsUpdatedCounter})
    return (
        <Suspense>
            <WorkoutDisplayCard workoutPlan={plan} key={plan.id}/>
            <SessionTable 
                workoutPlanId={plan.id || 0}
                setIsModalOpen={setIsModalOpen}
                setSelectedSession={setSelectedSession}
                sessionsUpdatedCounter={sessionsUpdatedCounter}
             />
            {
            isModalOpen && 
            <SessionModal 
                closeModal={()=> setIsModalOpen(false)}
                session={selectedSession}
                updateCounter={()=> {setSessionsUpdatedCounter(sessionsUpdatedCounter + 1)}}
                workoutPlan_id={workout_id}
            />}
        </Suspense>
        
    )
}

export default ViewWorkoutPlan