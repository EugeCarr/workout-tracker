"use client"
import  "../styles.css";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { userAccount, workoutPlan, planChangeAction} from "../interfaces/interfaces";
import { WorkoutDisplayCard } from "./WorkoutDisplayCard";
import { WorkoutEditCreate } from "./WorkoutsEditCreate";
import Link from "next/link";
import { getUsers } from "../api/getUsers";
import { useReducer, useEffect, useState, EffectCallback, FC, Suspense} from "react";
import { cookies } from "next/headers";

interface Props {
    // wPlans: workoutPlan[],
    clientUsers: userAccount[],
    trainerUsers: userAccount[],
    getPlansFunction: () =>Promise<workoutPlan[]>
};

export const WorkoutPlanGrid: FC<Props >= ({clientUsers, trainerUsers, getPlansFunction}): React.ReactNode  => {
    const [plans, setPlans ] = useState<workoutPlan[]>([{}] as workoutPlan[]);
    const [trainees, setTrainees] = useState<userAccount[]>(clientUsers);
    const [PTs, setPTs] = useState<userAccount[]>(trainerUsers);
    const [submitCounter, setSubmitCounter] = useState<number>(0);

    const incrementSubmitCounter = (): void => {
        const newVal = submitCounter + 1;
        setSubmitCounter(newVal)
        return 
    }
    useEffect(
        () => {
            const getWPlans = async (): Promise<void> => {
                console.log("Getting current plans")
                const queriedPlan = await fetch(
                    `/api/getWorkoutPlans`
                );                
                const allPlans = await queriedPlan.json()
                // console.log(allPlans)
                setPlans(allPlans)
                return
            };
            getWPlans();
            return 
        }, [submitCounter]
    );

    const planComps = plans.map((wPlan)=> {
        return (
            <>
                
                <Link
                    href={`myWorkouts/${wPlan.id}`}
                    style={{textDecoration: 'none'}}
                    key={wPlan.id}
                >
                    
                    <WorkoutDisplayCard workoutPlan={wPlan} key={wPlan.id}/>
                </Link>
            </>
            
            
        )
    }
    );
    return (
        <>
            <WorkoutEditCreate trainerUsers={PTs} clientUsers={trainees} submitCounterFunction={incrementSubmitCounter}/>
            <Suspense>
            {planComps}
            </Suspense>
            
        </>
    )
};

export default WorkoutPlanGrid;