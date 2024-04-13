"use client"
import  "../styles.css";
import { exerciseType} from "../interfaces/interfaces";
import {  useEffect, useState, FC, Suspense} from "react";
import { ExerciseTypeDisplayCard } from "./ExerciseTypeDisplayCard";
import { ExerciseTypeEditCreate } from "./ExerciseTypeEditCreate";


export const ExerciseTypeGrid: FC= (): React.ReactNode  => {
    const [exerciseTypes, setExerciseTypes] = useState<exerciseType[]>([] as exerciseType[]);
    const [submitCounter, setSubmitCounter] = useState<number>(0);
    
    useEffect(
        () => {
            const getExerciseTypes = async (): Promise<void> => {
                console.log("Getting current exercise types")
                const queriedTypes = await fetch(
                    `api/getExerciseTypes`
                );                
                const allTypes = await queriedTypes.json()
                // console.log(allPlans)
                setExerciseTypes(allTypes)
                return
            };
            getExerciseTypes();
            return 
        }, [submitCounter]
    );


    const incrementSubmitCounter = (): void => {
        const newVal = submitCounter + 1;
        setSubmitCounter(newVal)
        return 
    }

    const excerciseComps = exerciseTypes.map((exercise)=> {
        return (
            <ExerciseTypeDisplayCard exerciseType={exercise} key={exercise.id}/>         
            
        )
    }
    );
    return (
        <>
            <ExerciseTypeEditCreate submitCounterFunction={incrementSubmitCounter}/> 
            <Suspense>
                {excerciseComps}
            </Suspense>
            
        </>
    )
};