"use client";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import React, { ChangeEvent, FC } from "react";
import { useState } from "react";

interface Props {
    trainerUsers: userAccount[];
    clientUsers: userAccount[];
    submitCounterFunction: ()=> void;
}

export const WorkoutEditCreate: FC<Props > = ({trainerUsers, clientUsers, submitCounterFunction}): React.ReactNode => {
    const [editedWPlan, setEditedWPlan] = useState<workoutPlan>({} as workoutPlan);

    const buttonAction = async (): Promise<void> => {
        console.log("testing button")
        const writePlan: Response = await fetch(
            "/api/createWorkoutPlan",
            {
                method: "POST",
                body: JSON.stringify(editedWPlan)
            }
        );
        const writtenPlan = await writePlan.json();
        console.log({writtenPlan});
        if(!!writtenPlan){
            setEditedWPlan({
                name: "",
                trainer_id: 0,
                client_id: 0
            } as workoutPlan);
            submitCounterFunction();
        }
        return 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setEditedWPlan(
            {
                ...editedWPlan,
                [e.target.name]: e.target.value
            }
        )
    };

    const handleSelection = (e: ChangeEvent<HTMLSelectElement>): void => {        
        setEditedWPlan(
            {
                ...editedWPlan,
                [e.target.name]: e.target.value
            }
        )
    };

    

    const clientOptions = clientUsers.map((user)=> {
        return(
            <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name}`}</option>
        )
    });

    const trainerOptons = trainerUsers.map((user)=> {
        return(            
            <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name}`}</option>
        )
    });
    return (
        <div
                    className="login-card"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}           
                >
                    <form 
                        id="create-workout-plan"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }} 
                    >
                        <p
                            className="title"
                        >Create Workout Plan
                        </p>
                        <label htmlFor="name" className="standard-form-label">Name: </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            required
                            className="form-input"
                            value={editedWPlan.name}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Name"
                        />                  

                        <label htmlFor="client_id" className="standard-form-label">Client: </label>
                        <select
                            name="client_id"
                            id="client_id"
                            required
                            className="form-input"
                            value={editedWPlan.client_id}
                            onChange = {(e) => {handleSelection(e)}}
                        >
                            {
                                [
                                    <option value={undefined}>--Please pick a Client--</option>,
                                    clientOptions
                                ]
                            
                            }
                        </select>
                        <label htmlFor="trainer_id" className="standard-form-label">Trainer: </label>
                        <select
                            name="trainer_id"
                            id="trainer_id"
                            required
                            className="form-input"
                            value={editedWPlan.trainer_id}
                            onChange = {(e) => {handleSelection(e)}}
                        >
                            {
                                [
                                    <option value={undefined}>--Please pick a Trainer--</option>,
                                    trainerOptons
                                ]
                            
                            }
                        </select>
                        <button
                            name="form-button"
                            className="form-button"
                            disabled={!editedWPlan.name || !editedWPlan.client_id || !editedWPlan.trainer_id}
                            // type="submit"
                            onClick={buttonAction}
                        >Add workout Plan
                        </button>
                    </form>
                    
                </div>
    )
}