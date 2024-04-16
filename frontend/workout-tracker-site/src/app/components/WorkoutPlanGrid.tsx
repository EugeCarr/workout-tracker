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
};

// export const WorkoutPlanGrid: FC<Props >= ({clientUsers, trainerUsers}): React.ReactNode  => {
export const WorkoutPlanGrid = (): React.ReactNode => {
    const [plans, setPlans ] = useState<workoutPlan[]>([{}] as workoutPlan[]);
    const [trainees, setTrainees] = useState<userAccount[]>([{}] as userAccount[]);
    const [PTs, setPTs] = useState<userAccount[]>([{}] as userAccount[]);
    const [submitCounter, setSubmitCounter] = useState<number>(0);

    const incrementSubmitCounter = (): void => {
        const newVal = submitCounter + 1;
        setSubmitCounter(newVal)
        return 
    }

    useEffect(
        () => {

            const getAllUsers = async(): Promise<void> => {

                const clientsRes = await fetch(
                    `http://localhost:3000/api/getUsers/1`
                );   
                const clients = await clientsRes.json();
                setTrainees(clients)

                const trainersRes = await fetch(
                    `http://localhost:3000/api/getUsers/0`
                );   
                const trainers = await trainersRes.json();
                setPTs(trainers)
                return 
            }
            getAllUsers();
            return
        }, []
    );

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