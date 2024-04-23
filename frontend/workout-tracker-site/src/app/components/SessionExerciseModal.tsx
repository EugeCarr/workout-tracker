"use client"
import React, { useEffect } from "react"
import {FC, useState, ChangeEvent} from "react"
import { exercise, exerciseType, session } from "../interfaces/interfaces"
import { format } from "path"
import { MdCancel } from "react-icons/md"

interface Props {
    exercise: exercise;
    closeModal: () => void;
    setUpdateCounter: () => void;
    session_id: number;
    exerciseTypes: exerciseType[]
}

export const SessionExerciseModal: FC<Props> = ({exercise, closeModal, setUpdateCounter, session_id, exerciseTypes}): React.ReactNode => {
    const [editedExercise, setEditedExercise] = useState<exercise>(exercise || {} as exercise)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setEditedExercise(
            {
                ...editedExercise,
                [e.target.name]: e.target.value
            }
        )
    };

    const handleSelection = (e: ChangeEvent<HTMLSelectElement>): void => {        
        setEditedExercise(
            {
                ...editedExercise,
                [e.target.name]: e.target.value
            }
        )
    };

    const exerciseTypeOptions = exerciseTypes.map((ex: exerciseType) => {
        return (
            <option key={ex.id} value={ex.id}>{ex.name}</option> 
        )
    });

    const buttonAction = async (): Promise<void> => {
        console.log("testing button for modal")
        let url = "";
        let actionMethod = ""
        if(!editedExercise?.id){
            url = "/api/createSessionExercise";
            actionMethod = "POST";
        }else{
            url = `/api/updateSessionExercise/${editedExercise.id}`;
            actionMethod = "PUT";
        }
        console.log({url, actionMethod})
        console.log(editedExercise)
        const requestExercise = {
            name: editedExercise.type_id,
            sets: editedExercise.sets,
            repetitions: editedExercise.repetitions,
            session_id: session_id,
            type_id: editedExercise.type_id,
        }
        console.log({requestSession: requestExercise})
        const writeExercise: Response = await fetch(
            url,
            {
                method: actionMethod,
                body: JSON.stringify(requestExercise)
            }
        );
        const writtenExercise = await writeExercise.json();
        console.log({writtenExercise});
        if(!!writtenExercise){
            setUpdateCounter();
            closeModal();
        }
        return 
    };

    return (
        <div
            className="modal-container"
        >
            <div 
                className="modal"
            >
                <div
                    id="create-or-edit-session"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0.5rem"
                    }}
                >
                    <p
                        className="modal-title"
                    >
                        Create/edit Session
                    </p>
                    <label htmlFor="movement" className="standard-form-label">Movement: </label>                
                    <select
                        name="movement"
                        id="movement"
                        required
                        className="form-input"
                        value={editedExercise.type_id}
                            onChange = {(e) => {handleSelection(e)}}
                    >
                        {
                            [
                                <option value={undefined}>--Please pick a Movement--</option>,
                                exerciseTypeOptions
                            ]
                        
                        }
                    </select>
                    <label htmlFor="sets" className="standard-form-label">Sets: </label>
                    <input
                        name="sets"
                        id="sets"
                        type="number"
                        required
                        className="form-input"
                        value={editedExercise.sets}
                        onChange = {(e) => {handleChange(e)}}
                        placeholder="Sets"
                    /> 
                    <label htmlFor="repetitions" className="standard-form-label">Reps: </label>
                    <input
                        name="repetitions"
                        id="repetitions"
                        type="number"
                        required
                        className="form-input"
                        value={editedExercise.repetitions}
                        min="0"
                        onChange = {(e) => {handleChange(e)}}
                    />
                    <button
                        name="form-button"
                        className="form-button"
                        disabled={!editedExercise.type_id || !editedExercise.sets || !editedExercise.repetitions}
                        onClick={buttonAction}
                    >Submit
                    </button>
            </div>
                <MdCancel
                    style={{
                        color: "red",
                        marginRight: "0.5rem"
                    }}
                    onClick={()=> closeModal()}
                    title="Close Dialog"
                />
            </div>
        </div>
    )
}