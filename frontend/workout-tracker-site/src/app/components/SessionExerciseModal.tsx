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

    const buttonAction = async (): Promise<void> => {
        let url = "";
        let actionMethod = ""
        if(!editedExercise?.id){
            url = "/api/createSessionExercise";
            actionMethod = "POST";
        }else{
            url = `/api/updateSessionExercise/${editedExercise.id}`;
            actionMethod = "PUT";
        }
        const requestExercise = {
            sets: editedExercise.sets,
            reps: editedExercise.reps,
            session_id: session_id,
            type_id: editedExercise.type_id,
        }
        const writeExercise: Response = await fetch(
            url,
            {
                method: actionMethod,
                body: JSON.stringify(requestExercise)
            }
        );
        const writtenExercise = await writeExercise.json();
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
                    <label htmlFor="type_id" className="standard-form-label">Movement: </label>                
                    <select
                        name="type_id"
                        id="type_id"
                        required
                        className="form-input"
                        value={editedExercise.type_id}
                            onChange = {(e) => {handleSelection(e)}}
                    >
                        {
                            [undefined, ...exerciseTypes].map((ex: exerciseType| undefined, index: number)=> {
                                const label = !ex?.id ?  "--Please pick a Movement--" : ex.name
                                return(
                                    <option key={ex?.id|| index} value={ex?.id}>{label}</option>
                                )
                            })
                        
                        }
                    </select>
                    <label htmlFor="sets" className="standard-form-label">Sets: </label>
                    <input
                        name="sets"
                        id="sets"
                        type="number"
                        required
                        className="form-input"
                        min="0"
                        value={editedExercise.sets}
                        onChange = {(e) => {handleChange(e)}}
                        placeholder="Sets"
                    /> 
                    <label htmlFor="reps" className="standard-form-label">Reps: </label>
                    <input
                        name="reps"
                        id="reps"
                        type="number"
                        required
                        className="form-input"
                        value={editedExercise.reps}
                        min="0"
                        onChange = {(e) => {handleChange(e)}}
                    />
                    <button
                        name="form-button"
                        className="form-button"
                        disabled={!editedExercise.type_id || !editedExercise.sets || !editedExercise.reps}
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