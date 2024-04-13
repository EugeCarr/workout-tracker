"use client";
import { exerciseType, userAccount, workoutPlan } from "../interfaces/interfaces";
import React, { ChangeEvent, FC } from "react";
import { useState } from "react";

interface Props {
    submitCounterFunction: ()=> void;
}

export const ExerciseTypeEditCreate: FC<Props > = ({ submitCounterFunction}): React.ReactNode => {
    const [editedExerciseType, setEditedExerciseType] = useState<exerciseType>({} as exerciseType)

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
                        <button
                            name="form-button"
                            className="form-button"
                            disabled={!editedExerciseType.name || !editedExerciseType.description }
                            onClick={buttonAction}
                        >Create Exercise 
                        </button>
                    </form>
                    
                </div>
    )
}