"use client";
import { exerciseType, muscleGroup, userAccount, workoutPlan } from "../interfaces/interfaces";
import React, { ChangeEvent, FC, useState } from "react";
import Multiselect from "multiselect-react-dropdown";


interface Props {
    submitCounterFunction: ()=> void;
    muscleGroups: muscleGroup[]
}

export const ExerciseTypeEditCreate: FC<Props > = ({ submitCounterFunction, muscleGroups}): React.ReactNode => {
    const [editedExerciseType, setEditedExerciseType] = useState<exerciseType>({} as exerciseType)
    const muscleGroupOptions = muscleGroups?.map((muscle)=> {
        return {
            id: muscle.id,
            name: muscle.name
        }
    });

    const buttonAction = async (): Promise<void> => {
        console.log("testing button")
        const writeExercise: Response = await fetch(
            "/api/createExerciseType",
            {
                method: "POST",
                body: JSON.stringify(editedExerciseType)
            }
        );
        const writtenExerciseType = await writeExercise.json();
        console.log({writtenExerciseType});
        if(!!writtenExerciseType){
            setEditedExerciseType({
                name: "",
                description: "",
            } as exerciseType);
            submitCounterFunction();
        }
        return 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setEditedExerciseType(
            {
                ...editedExerciseType,
                [e.target.name]: e.target.value
            }
        )
    };
    return (
        <div
                    className="login-card"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}           
                >
                    <form 
                        id="create-exercise-type"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }} 
                    >
                        <p
                            className="title"
                        >Create Exercise
                        </p>
                        <label htmlFor="name" className="standard-form-label">Name: </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            required
                            className="form-input"
                            value={editedExerciseType.name}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Name"
                        />                  

                        <label htmlFor="description" className="standard-form-label">Description: </label>
                        <input
                            name="description"
                            placeholder="Description"
                            id="description"
                            type="text"
                            required
                            className="form-input"
                            value={editedExerciseType.description}
                            onChange = {(e) => {handleChange(e)}}
                        />
                        <label htmlFor="muscleGroups" className="standart-form-label">Muscle groups: </label>
                        <Multiselect
                            options={muscleGroupOptions}
                            selectionLimit={5}
                            displayValue="name"
                            selectedValues={editedExerciseType.muscleGroups}
                            onSelect={(e: React.ChangeEvent<HTMLInputElement>): void => { 
                                setEditedExerciseType(
                                    {
                                        ...editedExerciseType,
                                        muscleGroups: e as unknown as muscleGroup[]|| [{}] as muscleGroup[]
                                    }
                                )
                                return
                            }}
                            onRemove={(e: React.ChangeEvent<HTMLInputElement>): void => { 
                                setEditedExerciseType(
                                    {
                                        ...editedExerciseType,
                                        muscleGroups: e as unknown as muscleGroup[]|| [{}] as muscleGroup[]
                                    }
                                )
                                return
                            }}
                        />

                        <button
                            name="form-button"
                            className="form-button"
                            disabled={!editedExerciseType.name || !editedExerciseType.description || !editedExerciseType.muscleGroups}
                            onClick={buttonAction}
                        >Create Exercise 
                        </button>
                    </form>
                    
                </div>
    )
}