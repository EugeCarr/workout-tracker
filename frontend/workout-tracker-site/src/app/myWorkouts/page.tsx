"use server "
import { WorkoutPlanGrid } from "../components/WorkoutPlanGrid";

export const WorkoutPlans = async (): Promise<any> => {
    
    return (
            <div
                style={{
                    height: "100%"
                }}
            >
                <WorkoutPlanGrid />
            </div>
        
    )
}

export default WorkoutPlans