"use client"
import  "../styles.css";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { userAccount, workoutPlan, planChangeAction} from "../interfaces/interfaces";
import { WorkoutDisplayCard } from "./WorkoutDisplayCard";
import { WorkoutEditCreate } from "./WorkoutsEditCreate";
import Link from "next/link";
import { getUsers } from "../api/getUsers";
import { useReducer } from "react";

export const WorkoutPlanGrid = async (): Promise<any>  => {
    
    const getPlans= async(): Promise<workoutPlan[]> => {
        const workoutPlans: (workoutPlan[]) = await getWorkOutPlans();
        return workoutPlans
    };

    const getUsersInGroups = async(): Promise<any> => {
        const trainers: userAccount[] = await getUsers(false);
        const clients: userAccount[] = await getUsers(true);     
        return {trainers, clients}
    };    

    const changePlans = (state: workoutPlan[], change: planChangeAction ): workoutPlan[] => {
        let plans: workoutPlan[] = change.plans

        const planIds = (plans: workoutPlan[]): number[] => {
            let allPlans = plans.map((currentPlan)=> currentPlan?.id)
            return allPlans.filter(Boolean)
        }
        if( !!planIds(state).filter( id => planIds(plans).includes(id))){
            throw new Error("You cannot add an existing plan to the list of plans.")
        }
        switch(change.type){
            case "append":
                // let newPlans = state;
                return [
                    ...state,
                    ...plans
                ]
        }
        return state

    };

    // const plansQuery = await getPlans();
    // const plans = await getPlans();
    const plans: workoutPlan[] = []
    const users = await getUsersInGroups();
    // const [plans, changePlansReducer] = useReducer(changePlans, plansQuery);
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
            <WorkoutEditCreate trainerUsers={users.trainers} clientUsers={users.clients} />
            {planComps}
        </>
    )
};

export default WorkoutPlanGrid;