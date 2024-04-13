"use server";
import { exerciseType } from "../interfaces/interfaces";
import React, { FC } from "react";

interface Props {
    exerciseType: exerciseType;
}

export const ExerciseTypeDisplayCard: FC<Props > = ({ exerciseType}): React.ReactNode => {
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
                    {exerciseType.name}
                </p>
                <p>
                    {`Description: ${exerciseType?.description}`}
                </p>
            </div>
        </div>
    )
}