"use client";
import { exerciseType } from "../interfaces/interfaces";
import React, { FC } from "react";

interface Props {
    exerciseType: exerciseType;
}

export const ExerciseTypeDisplayCard: FC<Props > = ({ exerciseType}): React.ReactNode => {
    const muscleGroupCardComps = exerciseType.muscleGroups.map((muscle)=>{
        return (
            <div
                className="muscle-group-card"
                key={muscle.id}
            >
                {muscle.name}
            </div>
        )
    });

    return (
        <div
            style={{
                color:"#141414",
                borderRadius:"1rem",
                marginLeft:"15rem",
                marginRight:"15rem",
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <p
                        className="title"
                    >{exerciseType.name}</p>
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems:"center"
                    }}
                    >
                        {
                            muscleGroupCardComps
                        }
                    </div>
                </div>
                <p>
                    {`Description: ${exerciseType?.description}`}
                </p>
            </div>
        </div>
    )
}