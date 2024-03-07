import  "../styles.css";
import { getWorkOutPlans } from "../api/getWorkoutplans";
import { workoutPlan } from "../interfaces/interfaces";

export const WorkoutPlanGrid = async (): Promise<any>  => {
    // const [wPlans, setWPlans] = useState<workoutPlan |{}[]>([{}]);
    
    const getPlans= async(): Promise<workoutPlan| {}[]> => {
        const workoutPlans: (workoutPlan | {}[]) = await getWorkOutPlans();
        return workoutPlans
    } 

    const plans = await getPlans();
    console.log(plans)

    return (
        <p>Workout Plans</p>
    )
};

export default WorkoutPlanGrid;