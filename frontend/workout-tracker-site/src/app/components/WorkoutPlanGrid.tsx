import  "../styles.css";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { workoutPlan } from "../interfaces/interfaces";
import { WorkoutDisplayCard } from "./WorkoutDisplayCard";
import Link from "next/link";

export const WorkoutPlanGrid = async (): Promise<any>  => {
    // const [wPlans, setWPlans] = useState<workoutPlan |{}[]>([{}]);
    
    const getPlans= async(): Promise<workoutPlan[]> => {
        const workoutPlans: (workoutPlan[]) = await getWorkOutPlans();
        return workoutPlans
    } 

    const plans = await getPlans();
    console.log(plans)
    const planComps = plans.map((wPlan)=> {
        return (
            <Link
                href={`myWorkouts/${wPlan.id}`}
                style={{textDecoration: 'none'}}
            >
                <WorkoutDisplayCard workoutPlan={wPlan} key={wPlan.id}/>
            </Link>
            
        )
    }
    )
    return (
        <>
            {planComps}
        </>
    )
};

export default WorkoutPlanGrid;