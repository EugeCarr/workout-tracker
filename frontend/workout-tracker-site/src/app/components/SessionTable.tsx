"use client";
import { session } from "../interfaces/interfaces";
import React, { FC, useState, useEffect } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { BiSolidZoomIn } from "react-icons/bi";
import { SITE_DOMAIN_NAME } from "../config";
interface Props {
    workoutPlanId: number;
    setIsModalOpen: (isOpen: boolean)=> void;
    setSelectedSession: (session: session) => void;
    sessionsUpdatedCounter: number;
    setSelectedViewSession: (session: session) => void;
    selectedViewSession: session;
    setSelectedDeleteSession: (session: session) => void;
    setIsSessDeleteModalOpen: (isOpen: boolean) => void;
}

export const SessionTable: FC<Props > = ({ workoutPlanId, setIsModalOpen, setSelectedSession, sessionsUpdatedCounter, setSelectedViewSession, selectedViewSession, setIsSessDeleteModalOpen, setSelectedDeleteSession}): React.ReactNode => {
    console.log({workoutPlanId})
    const [listSessions, SetListSessions] = useState<session[]>([] as session[]);

    useEffect(
        () => {
            const getSessions = async(workoutPlan_id: number): Promise<void> => {
                const sessionsRes = await fetch(
                    `/api/getWorkoutPlans/getWorkoutSessions/${workoutPlan_id}`
                )
                const qSessions = await sessionsRes.json();
                SetListSessions(qSessions)
                return 
            };            
            getSessions(workoutPlanId);
            return
        }, [sessionsUpdatedCounter, workoutPlanId]
    );

    const deleteSession = (session_id: number): void => {
        const selectSession = listSessions.find((sess)=> sess.id === session_id) || {} as session
        setSelectedDeleteSession(selectSession);
        setIsSessDeleteModalOpen(true);
        return 
    };

    const editSession = (session_id: number): void => {
        const selectSession = listSessions.find((sess)=> sess.id === session_id) || {} as session
        console.log(selectSession)
        setSelectedSession(selectSession);
        setIsModalOpen(true);
        
        return 
    };

    const viewSession = (session_id: number): void => {
        if(session_id === selectedViewSession?.id){
            console.log("already selected")
            setSelectedViewSession({} as session);
            return 
        }
        const selectViewSession = listSessions.find((sess)=> sess.id === session_id) || {} as session
        console.log({selectViewSession})
        setSelectedViewSession(selectViewSession);        
        return 
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "80vw"
                }}
            >
                <p
                    className="title"
                    style={{
                        fontSize: "2rem"
                    }}
                >Sessions</p>
                <button
                    style={{
                        width: "20vw",
                        marginBottom: "0.5rem"                 
                    }}
                    className="form-button"
                    onClick={
                        (): void => {
                            setSelectedSession({} as session)
                            setIsModalOpen(true)
                            return
                        }
                    }
                >Add Session</button>
            </div>
            <table
                    className="session-table"
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSessions.map((session)=> {
                            return (
                                <tr key={session.id}>
                                    <td style={{
                                        width: "20vw"
                                    }}
                                    
                                    >{session.name}</td>
                                    <td style={{
                                        width: "35vw"
                                    }}
                                    >{session.description}</td>
                                    <td
                                    style={{
                                        width: "10vw",
                                        alignItems:"self-end"
                                    }}>{session.plannedDate}</td>
                                    <td
                                        style={{
                                            width: "10vw"
                                        }}
                                        className="actions-col">
                                        <span>
                                            <BsFillTrashFill
                                                className="delete-btn"
                                                onClick={()=> deleteSession(session.id)}
                                                title="Delete session"
                                            />
                                            <BsFillPencilFill
                                                className="edit-btn"
                                                onClick={()=> editSession(session.id)}
                                                title="Edit session"
                                            />
                                            <BiSolidZoomIn
                                                className="edit-btn"
                                                onClick={()=> viewSession(session.id)}
                                                title="View session"
                                            />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            
        </>
    )
}