"use client";
import { workoutPlan } from "../interfaces/interfaces";
import React, { FC, useState } from "react";

interface Props {
    workoutPlan: workoutPlan;
}

export const CreateEditDeleteWorkoutPlan: FC<Props > = ({ workoutPlan}): React.ReactNode => {
    const [wPlan, setWPlan] = useState(workoutPlan)

    const saveButtonAction = async ():  Promise<void> => {
        const test = async () => {
            setTimeout(() => {
                console.log("Test save button");
                return
            }, 1000)
            return 
        }
        return 
    };

    const deleteButtonAction = async ():  Promise<void> => {
        const test = async () => {
            setTimeout(() => {
                console.log("Test save button");
                return
            }, 1000)
            return 
        }
        return 
    };



    return (
        <div
            style={{
                backgroundColor:"#141414",
                borderRadius:"1rem",
                margin:"5rem",
                padding:"1rem",                
            }}
            className="link-card"
        >
            <div
                style ={{
                    display:"flex",
                    flexDirection:"column"
                }}
            >
                <p
                    className="title"
                >
                    Create/Edit Workout Plan 
                </p>
                <p
                    className="title"
                >
                    {workoutPlan.name}
                </p>
                <p>
                    {/* {`Client: ${workoutPlan.client.first_name} ${workoutPlan.client.last_name} `} */}
                </p>
                <p>
                    {/* {`Trainer: ${workoutPlan.trainer.first_name} ${workoutPlan.trainer.last_name}`} */}
                </p>
            </div>
        </div>
    )
}