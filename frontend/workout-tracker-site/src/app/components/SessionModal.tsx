"use client"
import React from "react"
import {FC, useState} from "react"
import { session } from "../interfaces/interfaces"
import { format } from "path"
import { MdCancel } from "react-icons/md"

interface Props {
    session: session;
    closeModal: () => void
}

export const SessionModal: FC<Props> = ({session, closeModal}): React.ReactNode => {
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
        // const isCreate = !editedSession?.id;
        let url = "";
        let actionMethod = ""
        if(!editedSession?.id){
            url = "/api/createSession";
            actionMethod = "POST";
        }else{
            url = `api/updateSession/${editedSession.id}`;
            actionMethod = "PUT";
        }
        const writeSession: Response = await fetch(
            url,
            {
                method: actionMethod,
                body: JSON.stringify(editedSession)
            }
        );
        const writtenSession = await writeSession.json();
        console.log({writtenSession});
        if(!!writtenSession){
            setEditedSession({
                name: "",
                description: "",
                plannedDate: ""
            } as session);
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
                <form
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
                </form>
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