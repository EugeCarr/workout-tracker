"use client"
import { getWorkOutPlans } from "@/app/api/getWorkoutplans";
import { WorkoutDisplayCard } from "@/app/components/WorkoutDisplayCard";
import React, { FC, Suspense, useState, useEffect} from "react";
import { workoutPlan, session, exercise, exerciseType } from "@/app/interfaces/interfaces";
import { SessionTable } from "@/app/components/SessionTable";
import { SessionModal } from "@/app/components/SessionModal";
import { SessionExerciseTable } from "@/app/components/SessionExerciseTable";
import { SessionExerciseModal } from "@/app/components/SessionExerciseModal";

interface Props  {
    params: any
}

export const ViewWorkoutPlan: FC<Props> = ({params}) => {
    const {workout_id} = params;
    const [plan, setPlan] = useState<workoutPlan>({} as workoutPlan);
    const [exerciseTypes, setExerciseTypes] = useState<exerciseType[]>([] as exerciseType[]);
    const [selectedSession, setSelectedSession] = useState<session>({} as session);
    const [sessionsUpdatedCounter, setSessionsUpdatedCounter] = useState<number>(0);    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedExercise, setSelectedExercise] = useState<exercise>({} as exercise);
    const [selectedViewSession, setSelectedViewSession] = useState<session>({} as session);
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState<boolean>(false);
    
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
            const getExerciseTypes = async (): Promise<void> => {
                console.log("Getting current exercise types")
                const queriedTypes = await fetch(
                    `http://localhost:3000/api/getExerciseTypes`
                );                
                const allTypes = await queriedTypes.json()
                setExerciseTypes(allTypes)
                return
            };
            getExerciseTypes();            
            getWPlan();
            return 
        }, []
    );

    console.log({sessionsUpdatedCounter})
    console.log({exerciseTypes})
    return (
        <Suspense>
            <div
            style={{
                height: "100%"
            }}
            >
                <WorkoutDisplayCard workoutPlan={plan} key={plan.id}/>

                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                >
                    <SessionTable 
                        workoutPlanId={workout_id || 0}
                        setIsModalOpen={setIsModalOpen}
                        setSelectedSession={setSelectedSession}
                        sessionsUpdatedCounter={sessionsUpdatedCounter}
                        setSelectedViewSession={setSelectedViewSession}
                        selectedViewSession={selectedViewSession}
                    />            
                    {
                        !!selectedViewSession.id &&
                        <SessionExerciseTable
                            setIsExerciseModalOpen={(isOpen: boolean): void=> setIsExerciseModalOpen(isOpen)}
                            session={selectedViewSession}
                            updateCounter={exercisesUpdatedCounter}
                            setSelectedExercise={(ex:exercise)=> setSelectedExercise(ex)}                       
                        />
                    }
                </div>
                {
                    isModalOpen && 
                    <SessionModal 
                        closeModal={()=> setIsModalOpen(false)}
                        session={selectedSession}
                        updateCounter={()=> {setSessionsUpdatedCounter(sessionsUpdatedCounter + 1)}}
                        workoutPlan_id={workout_id}
                    />
                }
                {
                    !!selectedViewSession.id &&
                    isExerciseModalOpen &&
                    <SessionExerciseModal
                        exercise={selectedExercise}
                        closeModal={()=> setIsExerciseModalOpen(false)}
                        setUpdateCounter={()=> setExercisesUpdatedCounter(exercisesUpdatedCounter + 1)}
                        session_id={selectedViewSession.id}
                        exerciseTypes={exerciseTypes}
                    />
                }
            </div>
        </Suspense>
        
    )
}

export default ViewWorkoutPlan