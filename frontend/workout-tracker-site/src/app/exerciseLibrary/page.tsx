"use server"
import { Suspense, useEffect, useState} from "react";
import { exerciseType } from "../interfaces/interfaces";
import { ExerciseTypeGrid } from "../components/ExerciseTypeGrid";


const WorkoutPlans = (): React.ReactNode => {
    
    return (
        <div
                style={{
                    height: "auto"
                }}
                id="full"
            >
                <ExerciseTypeGrid/>
            </div>
            
        
    )
}

export default WorkoutPlans