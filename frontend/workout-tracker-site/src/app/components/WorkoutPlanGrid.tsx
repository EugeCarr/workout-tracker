import  "../styles.css";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import { WorkoutDisplayCard } from "./WorkoutDisplayCard";
import { WorkoutEditCreate } from "./WorkoutsEditCreate";
import Link from "next/link";
import { getUsers } from "../api/getUsers";

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
    

    const plans = await getPlans();
    const users = await getUsersInGroups();
    const planComps = plans.map((wPlan)=> {
        return (
            <>
                <WorkoutEditCreate trainerUsers={users.trainers} clientUsers={users.clients}/>
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
            {planComps}
        </>
    )
};

export default WorkoutPlanGrid;