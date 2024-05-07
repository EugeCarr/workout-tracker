"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";

const WorkoutPlans = async (): Promise<any> => {
    
    return (
            <div
                style={{
                    height: "100%"
                }}
                id="full"
            >
                <WorkoutPlanGrid />
            </div>
        
    )
}

export default WorkoutPlans