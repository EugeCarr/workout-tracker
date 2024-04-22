"use client";
import { session, workoutPlan } from "../interfaces/interfaces";
import React, { FC, useState } from "react";
import { BsFillTrash2Fill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

interface Props {
    workoutPlanId: number;
    setIsModalOpen: (isOpen: boolean)=> void;
    sessions: session[];
    setSelectedSession: (session: session) => void;
}

export const SessionTable: FC<Props > = ({ workoutPlanId, setIsModalOpen, sessions, setSelectedSession}): React.ReactNode => {
    console.log(workoutPlanId)
    let defaultSessions: session[] = [
        {
            id: 1,
            workoutPlan_id: 1,
            name: "Test session for UI",
            description: "This is a dummy session. It did not come from the db",
            plannedDate: "2024-04-22",                
        }
    ];
    console.log({sessions})
    !sessions.map((s)=> s.id) ? defaultSessions = sessions: defaultSessions = defaultSessions;
    console.log({defaultSessions})
    const [listSessions, SetListSessions] = useState<session[]>(defaultSessions);

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
        <div
            className="form card"
        >
            <table
                className="session-table"
            >
                <thead>
                    <tr>
                        <th>Session Name</th>
                        <th>Description</th>
                        <th>Day</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listSessions.map((session)=> {
                        return (
                            <tr key={session.id}>
                                <td>{session.name}</td>
                                <td>{session.description}</td>
                                <td>Mondays</td>
                                <td className="actions-col">
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

        </div>
    )
}