"use client";
import { userAccount, workoutPlan } from "../interfaces/interfaces";
import React, { ChangeEvent, FC } from "react";
import { Card, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { SelectHTMLAttributes, DetailedHTMLProps} from "react";
import { Select, FormControl, Input, FormLabel } from "@chakra-ui/react";
import { createWorkoutPlans } from "../api/createWorkoutPlan";

interface Props {
    trainerUsers: userAccount[];
    clientUsers: userAccount[];
}

export const WorkoutEditCreate: FC<Props > = ({trainerUsers, clientUsers}): React.ReactNode => {
    const [editedWPlan, setEditedWPlan] = useState<workoutPlan>({         
    });

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

    const buttonAction = async (): Promise<void> => {
        console.log("testing button")
        const writtenPlans = await createWorkoutPlans(editedWPlan);
        console.log(writtenPlans);
        return
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
                >
                    <p
                        className="title"
                    >Create Workout Plan
                    </p>
                    <FormControl isRequired className="form-input">
                        <FormLabel htmlFor="name" className="standard-form-label">Name: </FormLabel>
                        <Input
                            name="name"
                            id="name"
                            value={editedWPlan.name}
                            onChange = {(e) => {handleChange(e)}}
                            placeholder="Name"
                        />
                    </FormControl>
                    <FormControl isRequired className="form-input">
                        <FormLabel htmlFor="client_id" className="standard-form-label">Client: </FormLabel>
                        <Select
                            name="client_id"
                            id="client_id"
                            value={editedWPlan.client_id}
                            onChange = {(e) => {handleSelection(e)}}
                            placeholder="--Please choose a Client--"
                        >
                            {clientOptions}
                        </Select>
                    </FormControl>
                    <FormControl isRequired className="form-input">
                        <FormLabel htmlFor="trainer_id" className="standard-form-label">Trainer: </FormLabel>
                        <Select
                            name="trainer_id"
                            id="trainer_id"
                            value={editedWPlan.trainer_id}
                            onChange = {(e) => {handleSelection(e)}}
                            placeholder="--Please choose a Trainer--"
                        >
                            {trainerOptons}
                        </Select>
                    </FormControl>
                    <button
                        name="login-button"
                        className="login-button"
                        disabled={!editedWPlan.name || !editedWPlan.client_id || !editedWPlan.trainer_id}
                        onClick={buttonAction}
                    >Add workout Plan</button>
                    
                </div>
    )
}