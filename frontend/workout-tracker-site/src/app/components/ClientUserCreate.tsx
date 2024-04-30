"use client";
import { signupDetails } from "../interfaces/interfaces";
import React, { ChangeEvent, FC } from "react";
import { useState } from "react";


export const ClientUserCreate: FC = (): React.ReactNode => {
    const [newClientUser, setNewClientUser] = useState<signupDetails>({} as signupDetails);

    const buttonAction = async (): Promise<void> => {
        // console.log("testing button")
        // const writePlan: Response = await fetch(
        //     "/api/createWorkoutPlan",
        //     {
        //         method: "POST",
        //         body: JSON.stringify(newClientUser)
        //     }
        // );
        // const writtenPlan = await writePlan.json();
        // console.log({writtenPlan});
        // if(!!writtenPlan){
        //     setNewClientUser({} as signupDetails);
        //     submitCounterFunction();
        // }
        return 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setNewClientUser(
            {
                ...newClientUser,
                [e.target.name]: e.target.value
            }
        )
    };

    return (
        <div
                    className="form-card"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}           
                >
                    <div 
                        id="create-workout-plan"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }} 
                    >
                        <p
                            className="title"
                        >Create New Client
                        </p>
                        <label htmlFor="first_name" className="standard-form-label">Firstname: </label>
                        <input
                            name="first_name"
                            id="first_name"
                            type="text"
                            required
                            className="form-input"
                            value={newClientUser.first_name}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Firstname"
                        />  
                        <label htmlFor="last_name" className="standard-form-label">Surname: </label>
                        <input
                            name="last_name"
                            id="last_name"
                            type="text"
                            required
                            className="form-input"
                            value={newClientUser.last_name}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Surname"
                        />   
                        <label htmlFor="email" className="standard-form-label">Email: </label>
                        <input
                            name="email"
                            id="email"
                            type="text"
                            required
                            className="form-input"
                            value={newClientUser.email}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Email"
                        />   
                        <label htmlFor="password" className="standard-form-label">Surname: </label>
                        <input
                            name="password"
                            id="password"
                            type="text"
                            required
                            className="form-input"
                            value={newClientUser.password}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Password"
                        />   
                        <label htmlFor="re_password" className="standard-form-label">Re-type password: </label>
                        <input
                            name="re_password"
                            id="re_password"
                            type="text"
                            required
                            className="form-input"
                            value={newClientUser.re_password}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Re-type password"
                        />                  
                        
                        
                        <button
                            name="form-button"
                            className="form-button"
                            disabled={!newClientUser.first_name || !newClientUser.last_name || !newClientUser.email|| !newClientUser.password || !newClientUser.re_password}
                            onClick={buttonAction}
                        >Create Client
                        </button>
                    </div>
                    
                </div>
    )
}