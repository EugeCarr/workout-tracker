"use client";
import { session, workoutPlan } from "../interfaces/interfaces";
import React, { FC, useState, useEffect } from "react";
import { BsFillTrash2Fill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

interface Props {
    workoutPlanId: number;
    setIsModalOpen: (isOpen: boolean)=> void;
    setSelectedSession: (session: session) => void;
    sessionsUpdatedCounter: number;
}

export const SessionTable: FC<Props > = ({ workoutPlanId, setIsModalOpen, setSelectedSession, sessionsUpdatedCounter}): React.ReactNode => {
    console.log({workoutPlanId})
    const [listSessions, SetListSessions] = useState<session[]>([] as session[]);

    useEffect(
        () => {
            const getSessions = async(workoutPlan_id: number): Promise<void> => {
                const sessionsRes = await fetch(
                    `http://localhost:3000/api/getWorkoutPlans/getWorkoutSessions/${workoutPlan_id}`
                )
                const qSessions = await sessionsRes.json();
                SetListSessions(qSessions)
                return 
            };            
            getSessions(workoutPlanId);
            return
        }, [sessionsUpdatedCounter]
    );

    const deleteSession = async (session_id: number): Promise<void> => {
        setTimeout(() => {
            console.log(`deleteSession: ${session_id}`)
        }, 1000);
        return 
    };

    const editSession = async (session_id: number): Promise<void> => {
        setTimeout(() => {
            console.log(`edit Session: ${session_id}`)
        }, 1000);
        const selectSession = listSessions.find((sess)=> sess.id === session_id) || {} as session
        console.log(selectSession)
        setSelectedSession(selectSession);
        setIsModalOpen(true);
        
        return 
    };

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