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
import { SITE_DOMAIN_NAME } from "../config";

interface Props {
    clientUsers: userAccount[],
    trainerUsers: userAccount[],
};

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
                    `/api/getUsers/1`
                );   
                const clients = await clientsRes.json();
                setTrainees(clients)

                const trainersRes = await fetch(
                    `/api/getUsers/0`
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
                const queriedPlan = await fetch(
                    `/api/getWorkoutPlans`
                );                
                const allPlans = await queriedPlan.json()
                setPlans(allPlans)
                return
            };
            getWPlans();
            return 
        }, [submitCounter]
    );
    return (
        <>
            <WorkoutEditCreate trainerUsers={PTs} clientUsers={trainees} submitCounterFunction={incrementSubmitCounter}/>
            <Suspense>
                {
                    plans.map((wPlan)=>(
                        <Link
                                href={`myWorkouts/${wPlan.id}`}
                                style={{textDecoration: 'none'}}
                                key={wPlan.id}
                            >
                                
                                <WorkoutDisplayCard workoutPlan={wPlan|| {} as workoutPlan} className="link-card"/>
                        </Link>                       
                    ))
                }
            </Suspense>
            
        </>
    )
};

export default WorkoutPlanGrid;