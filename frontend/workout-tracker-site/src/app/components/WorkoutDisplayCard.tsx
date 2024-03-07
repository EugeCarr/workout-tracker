"use server";
import { workoutPlan } from "../interfaces/interfaces";
import React, { FC } from "react";
import { Card, Flex } from "@chakra-ui/react";

interface Props {
    workoutPlan: workoutPlan;
}

export const WorkoutDisplayCard: FC<Props > = ({ workoutPlan}): React.ReactNode => {
    return (
        <Card
            backgroundColor="#141414"
            borderRadius="1rem"
            margin="5rem"
            padding="1rem"
            className="link-card"
        >
            <Flex
                direction="column"
            >
                <p
                    className="title"
                >
                    {workoutPlan.name}
                </p>
                <p>
                    {`Client: ${workoutPlan.client.first_name} ${workoutPlan.client.last_name} `}
                </p>
                <p>
                    {`Trainer: ${workoutPlan.trainer.first_name} ${workoutPlan.trainer.last_name}`}
                </p>
            </Flex>
        </Card>
    )
}