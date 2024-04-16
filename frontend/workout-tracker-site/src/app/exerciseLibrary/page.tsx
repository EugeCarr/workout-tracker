"use server"
import { Suspense, useEffect, useState} from "react";
import { exerciseType } from "../interfaces/interfaces";
import { ExerciseTypeGrid } from "../components/ExerciseTypeGrid";


const WorkoutPlans = (): React.ReactNode => {
    
    return (
            <ExerciseTypeGrid/>
        
    )
}

export default WorkoutPlans