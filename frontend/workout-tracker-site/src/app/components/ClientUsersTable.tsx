"use client";
import { userAccount } from "../interfaces/interfaces";
import React, { FC, useEffect, useState } from "react";

interface Props {
    counter: number;
}

export const ClientUserTable : FC<Props> = ({counter}): React.ReactNode => {
    const [clients, setClients] = useState<userAccount[]>([] as userAccount[]);

    useEffect(
        () => {
            const getClients = async (): Promise<void> => {
                const queriedClients = await fetch(
                    `api/getUsers/1`
                );                
                const clients = await queriedClients.json()
                setClients(clients)                
                return
            }
            getClients()
        }, [counter]
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "80vw",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
                marginTop: "2rem"
            }}
        >
            <table
                    className="session-table"
                >
                    <thead>
                        <tr>
                            <th style={{
                                width: "20vw",
                                textAlign: "left"
                            }}

                            >Firstname</th>

                            <th style={{
                                width: "20vw",
                                textAlign: "left"
                            }}

                            >Surname</th>
                            <th style={{
                                width: "40vw",
                                textAlign: "left"
                            }}

                            >Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((clientUser)=> {
                            return (
                                <tr key={clientUser.id}>
                                    <td style={{
                                        width: "20vw",
                                        textAlign: "left"
                                    }}
                                    
                                    >{clientUser.first_name}</td>
                                    <td style={{
                                        width: "20vw",
                                        textAlign: "left"
                                    }}
                                    >{clientUser.last_name}</td>
                                    <td
                                    style={{
                                        width: "40vw",
                                        textAlign: "left"
                                    }}>{clientUser.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
            
        </div>
        
    )

}