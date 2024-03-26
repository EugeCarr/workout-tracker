"use server";
import { workoutPlan } from "../interfaces/interfaces";
import React, { FC } from "react";

interface Props {
    workoutPlan: workoutPlan;
}

export const WorkoutDisplayCard: FC<Props > = ({ workoutPlan}): React.ReactNode => {
    return (
        <div
            style={{
                color:"#141414",
                borderRadius:"1rem",
                marginLeft:"5rem",
                marginRight:"5rem",
                marginBottom:"0.5rem",
                padding:"1rem",
            }}
            className="link-card"
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <p
                    className="title"
                >
                    {workoutPlan.name}
                </p>
                <p>
                    {`Client: ${workoutPlan.client?.first_name} ${workoutPlan.client?.last_name} `}
                </p>
                <p>
                    {`Trainer: ${workoutPlan.trainer?.first_name} ${workoutPlan.trainer?.last_name}`}
                </p>
            </div>
        </div>
    )
}