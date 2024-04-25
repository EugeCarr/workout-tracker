"use client"
import  "../styles.css";
import { exerciseType, muscleGroup} from "../interfaces/interfaces";
import {  useEffect, useState, FC, Suspense} from "react";
import { ExerciseTypeDisplayCard } from "./ExerciseTypeDisplayCard";
import { ExerciseTypeEditCreate } from "./ExerciseTypeEditCreate";


export const ExerciseTypeGrid: FC= (): React.ReactNode  => {
    const [exerciseTypes, setExerciseTypes] = useState<exerciseType[]>([] as exerciseType[]);
    const [submitCounter, setSubmitCounter] = useState<number>(0);
    const [muscleGroups, setMuscleGroups] = useState<muscleGroup[]>([] as muscleGroup[])
    
    useEffect(
        () => {
            const getExerciseTypes = async (): Promise<void> => {
                console.log("Getting current exercise types")
                const queriedTypes = await fetch(
                    `api/getExerciseTypes`
                );                
                const allTypes = await queriedTypes.json()
                setExerciseTypes(allTypes)
                return
            };
            getExerciseTypes();
            return 
        }, [submitCounter]
    );

    useEffect(
        () => {
            const getMuscleGroups = async (): Promise<void> => {
                const queriedMgroups = await fetch(
                    `api/getMuscleGroups`
                );                
                const allMGroups = await queriedMgroups.json()
                setMuscleGroups(allMGroups)
                return
            };
            getMuscleGroups();
            return 
        }, []
    );


    const incrementSubmitCounter = (): void => {
        const newVal = submitCounter + 1;
        setSubmitCounter(newVal)
        return 
    }

    const excerciseComps = exerciseTypes.map((exerciseType)=> {
        return (
            <ExerciseTypeDisplayCard exerciseType={exerciseType|| {} as exerciseType} key={exerciseType.id}/>         
            
        )
    }
    );
    return (
        <>
            <ExerciseTypeEditCreate submitCounterFunction={incrementSubmitCounter} muscleGroups={muscleGroups}/> 
            <Suspense>
                {excerciseComps}
            </Suspense>
            
        </>
    )
};