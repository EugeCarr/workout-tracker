"use client";
import { planChangeAction, userAccount, workoutPlan } from "../interfaces/interfaces";
import React, { ChangeEvent, Dispatch, FC } from "react";
import { Card, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SelectHTMLAttributes, DetailedHTMLProps} from "react";
import { Select, FormControl, Input, FormLabel } from "@chakra-ui/react";
import { createWorkoutPlans } from "../api/createWorkoutPlan";
import { useCookies } from "react-cookie";


interface Props {
    trainerUsers: userAccount[];
    clientUsers: userAccount[];
    changePlans?: Dispatch<planChangeAction>;
}

export const WorkoutEditCreate: FC<Props > = ({trainerUsers, clientUsers, changePlans}): React.ReactNode => {
    const [editedWPlan, setEditedWPlan] = useState<workoutPlan>({} as workoutPlan);

    const router = useRouter();

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
        const writtenPlans: workoutPlan[] = await createWorkoutPlans(editedWPlan);
        console.log({writtenPlans});
        if(!!writtenPlans){
            console.log("Plan created successfully")
            setEditedWPlan({} as workoutPlan)
            // changePlans({
            //     type: "append",
            //     plans: writtenPlans
            // })
        }
        // Remember to use useRouter hook to reload the page once the write to the backend is completed.
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

    console.log({editedWPlan})
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