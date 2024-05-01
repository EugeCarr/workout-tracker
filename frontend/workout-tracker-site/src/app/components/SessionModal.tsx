"use client"
import React from "react"
import {FC, useState} from "react"
import { session } from "../interfaces/interfaces"
import { format } from "path"
import { MdCancel } from "react-icons/md"
import { SITE_DOMAIN_NAME } from "../config"

interface Props {
    session: session;
    closeModal: () => void;
    updateCounter: () => void;
    workoutPlan_id: number;
}

export const SessionModal: FC<Props> = ({session, closeModal, updateCounter, workoutPlan_id}): React.ReactNode => {
    const [editedSession, setEditedSession] = useState<session>(session || {} as session)

    const getDateString = (date: Date): string =>{
        // Extract year, month, and day
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        let day = String(date.getDate()).padStart(2, '0');

        // Format date as YYYY-MM-DD
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setEditedSession(
            {
                ...editedSession,
                [e.target.name]: e.target.value
            }
        )
    };

    const buttonAction = async (): Promise<void> => {
        console.log("testing button for modal")
        let url = "";
        let actionMethod = ""
        if(!editedSession?.id){
            url = "/api/createSession";
            actionMethod = "POST";
        }else{
            url = `/api/updateSession/${editedSession.id}`;
            actionMethod = "PUT";
        }
        console.log({url, actionMethod})
        console.log(editedSession)
        const requestSession = {
            name: editedSession.name,
            description: editedSession.description,
            plannedDate: editedSession.plannedDate,
            workoutPlan_id: workoutPlan_id
        }
        console.log({requestSession})
        const writeSession: Response = await fetch(
            url,
            {
                method: actionMethod,
                body: JSON.stringify(requestSession)
            }
        );
        const writtenSession = await writeSession.json();
        console.log({writtenSession});
        if(!!writtenSession){
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
                        Create/edit Session
                    </p>
                    <label htmlFor="name" className="standard-form-label">Name: </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            required
                            className="form-input"
                            value={editedSession.name}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Name"
                        />                  

                        <label htmlFor="description" className="standard-form-label">Description: </label>
                        <input
                            name="description"
                            id="description"
                            type="text"
                            required
                            className="form-input"
                            value={editedSession.description}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Description"
                        /> 
                        <label htmlFor="plannedDate" className="standard-form-label">Planned Date: </label>
                        <input
                            name="plannedDate"
                            id="plannedDate"
                            type="date"
                            required
                            className="form-input"
                            value={editedSession.plannedDate}
                            min={getDateString(new Date())}
                            onChange = {(e) => {handleChange(e)}}
                        />
                        <button
                            name="form-button"
                            className="form-button"
                            disabled={!editedSession.name || !editedSession.description || !editedSession.plannedDate}
                            // type="submit"
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