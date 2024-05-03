"use client"
import React from "react"
import {FC, useState} from "react"
import { exercise, session } from "../interfaces/interfaces"
import { format } from "path"
import { MdCancel } from "react-icons/md"
import { SITE_DOMAIN_NAME } from "../config"

interface Props {
    exercise: exercise;
    closeModal: () => void;
    updateCounter: () => void;
    setSelectedDeleteExercise: (exercise: exercise) => void;
}

export const DeleteExerciseModal: FC<Props> = ({exercise, closeModal, updateCounter, setSelectedDeleteExercise}): React.ReactNode => {

    const deleteButtonAction = async (): Promise<void> => {
        let url = `/api/deleteExercise/${exercise.id}`;
        let actionMethod = "DELETE";
        const deleteExerciseRes: Response = await fetch(
            url,
            {
                method: actionMethod,
            }
        );
        if(deleteExerciseRes.status === 204){
            setSelectedDeleteExercise({} as exercise);
            updateCounter();
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
                        {`Delete Exercise: ${exercise.type?.name}`}
                    </p>
                    <p
                    >
                        Are you sure you would like to delete this exercise from the session?
                    </p>
                        <button
                            name="delete-button"
                            className="delete-button"
                            onClick={deleteButtonAction}
                        >Delete
                        </button>
                </div>
                <MdCancel
                    style={{
                        color: "red",
                        marginRight: "0.5rem"
                    }}
                    onClick={()=> {
                        setSelectedDeleteExercise({} as exercise);
                        closeModal();
                        return
                    }}
                    title="Close Dialog"
                />
            </div>
        </div>
    )
}