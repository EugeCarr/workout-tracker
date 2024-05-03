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
    setSelectedDeleteSession: (session:session) => void;
}

export const DeleteSessionModal: FC<Props> = ({session, closeModal, updateCounter, setSelectedDeleteSession}): React.ReactNode => {

    const deleteButtonAction = async (): Promise<void> => {
        let url = `/api/deleteSession/${session.id}`;
        let actionMethod = "DELETE";
        const deleteSessionRes: Response = await fetch(
            url,
            {
                method: actionMethod,
            }
        );
        if(deleteSessionRes.status === 204){
            setSelectedDeleteSession({} as session);
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
                        {`Delete Session: ${session.name}`}
                    </p>
                    <p
                    >
                        Are you sure you would like to delete this session?
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
                        setSelectedDeleteSession({} as session);
                        closeModal();
                        return
                    }}
                    title="Close Dialog"
                />
            </div>
        </div>
    )
}