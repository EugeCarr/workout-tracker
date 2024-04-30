"use client";
import { userAccount } from "../interfaces/interfaces";
import React, { FC, useEffect, useState } from "react";


export const ClientUserTable : FC = (): React.ReactNode => {
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
        }, []
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
                                width: "20vw"
                            }}

                            >Firstname</th>

                            <th style={{
                                width: "20vw"
                            }}

                            >Surname</th>
                            <th style={{
                                width: "40vw",
                                alignItems:"self-end"
                            }}

                            >Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((clientUser)=> {
                            return (
                                <tr key={clientUser.id}>
                                    <td style={{
                                        width: "20vw"
                                    }}
                                    
                                    >{clientUser.first_name}</td>
                                    <td style={{
                                        width: "20vw"
                                    }}
                                    >{clientUser.last_name}</td>
                                    <td
                                    style={{
                                        width: "40vw",
                                        alignItems:"self-end"
                                    }}>{clientUser.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
            
        </div>
        
    )

}