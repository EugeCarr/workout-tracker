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
        const writeExercise: Response = await fetch(
            "/api/createExerciseType",
            {
                method: "POST",
                body: JSON.stringify(editedExerciseType)
            }
        );
        const writtenExerciseType = await writeExercise.json();
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
            className="form-card"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}           
        >
            <div
                id="create-exercise-type"                        
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                >
                    <p
                        className="title"
                    >Create Exercise
                    </p>
                </div>
                
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start"
                    }} 
                >
                    
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
                    width="80vw"
                    maxLength={1000}
                    type="textarea"
                    size={100}
                    spellCheck={true}
                    required
                    className="form-input"
                    value={editedExerciseType.description}
                    onChange = {(e) => {handleChange(e)}}
                />
                <label htmlFor="muscleGroups" className="standard-form-label">Muscle groups: </label>
                <Multiselect
                    options={muscleGroupOptions}
                    selectionLimit={5}
                    displayValue="name"
                    className="form-input"
                    style={{
                        chips: {
                            background: "#4BFB68",
                            color: "#141414"
                        }
                    }}
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
                </div>                       
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                >
                    <button
                        name="form-button"
                        className="form-button"
                        disabled={!editedExerciseType.name || !editedExerciseType.description || !editedExerciseType.muscleGroups}
                        onClick={buttonAction}
                    >Create Exercise 
                    </button>
                </div>
            </div>
            
        </div>
    )
}