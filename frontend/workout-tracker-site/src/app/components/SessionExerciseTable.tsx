"use client";
import { format } from "path";
import { session, exercise, muscleGroup } from "../interfaces/interfaces";
import React, { FC, useState, useEffect} from "react";
import { BsFillTrash2Fill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

interface Props {
    session: session;
    setIsExerciseModalOpen: (isOpen: boolean)=> void;
    setSelectedExercise: (exercise: exercise) => void;
    updateCounter: number;
}

export const SessionExerciseTable: FC<Props > = ({ session, setIsExerciseModalOpen, setSelectedExercise, updateCounter}): React.ReactNode => {
    const [listexercises, SetListexercises] = useState<exercise[]>([] as exercise[]);

    const deleteSession = async (exercise_id: number): Promise<void> => {
        setTimeout(() => {
            console.log(`delete exercise: ${exercise_id}`)
        }, 1000);
        return 
    };

    useEffect(
        () => {
            const getSessionExercises = async (session_id: number) : Promise<void> => {
                const exercisesRes = await fetch(
                    `/api/getSessionExercises/${session_id}`
                )
                const exercises = await exercisesRes.json();
                SetListexercises(exercises)
                return 
            };            
            getSessionExercises(session.id);
            return
            }, [updateCounter, session]
    );
    const editSession = async (exercise_id: number): Promise<void> => {
        setTimeout(() => {
            console.log(`edit Session: ${exercise_id}`)
        }, 1000);        
        const selectExercise = listexercises.find((ex)=> ex.id === exercise_id) || {} as exercise
        console.log(selectExercise)
        setSelectedExercise({
            ...selectExercise,
            type_id: selectExercise.type?.id || 0
        });
        setIsExerciseModalOpen(true);
        
        return 
    };

    const formatMuscleGroups = (exercise: exercise): string => {
        const muscleGroups = exercise.type?.muscleGroups;
        const string = muscleGroups?.reduce(
            (finalString, currentMg: muscleGroup)=> {
                const test = currentMg.name
                console.log({test})
                let newString = "";
                if(!finalString){
                    newString = currentMg.name|| "";
                }else{
                    newString = finalString + ", " + currentMg.name
                }
                console.log({newString})
                return newString
            },""
        );
        console.log(string)
        return string || ""
    }

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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "80vw"
                }}
            >
                <p
                    className="title"
                    style={{
                        fontSize: "2rem"
                    }}
                >{`Exercises in: ${session.name} `}</p>
                <button
                    style={{
                        width: "20vw",
                        marginBottom: "0.5rem"                 
                    }}
                    className="form-button"
                    onClick={
                        (): void => {
                            setSelectedExercise({} as exercise)
                            setIsExerciseModalOpen(true)
                            return
                        }
                    }
                >Add Exercise</button>
            </div>
            <table
                    className="session-table"
                >
                    <thead>
                        <tr>
                            <th style={{
                                width: "25vw"
                            }}

                            >Movement</th>
                            <th style={{
                                width: "35vw"
                            }}

                            >Muscle Groups</th>
                            <th style={{
                                width: "10vw",
                                alignItems:"self-end"
                            }}

                            >Sets</th>
                            <th style={{
                                width: "10vw",
                                alignItems:"self-end"
                            }}

                            >Repetitions</th>
                            <th style={{
                                width: "10vw"
                            }}

                            >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listexercises.map((exercise)=> {
                            return (
                                <tr key={exercise.id}>
                                    <td style={{
                                        width: "25vw"
                                    }}
                                    
                                    >{exercise.type?.name}</td>
                                    <td style={{
                                        width: "35vw"
                                    }}
                                    >{formatMuscleGroups(exercise)}</td>
                                    <td
                                    style={{
                                        width: "10vw",
                                        alignItems:"self-end"
                                    }}>{exercise.sets}</td>
                                    <td
                                    style={{
                                        width: "10vw",
                                        alignItems:"self-end"
                                    }}>{exercise.reps}</td>
                                    <td
                                        style={{
                                            width: "10vw"
                                        }}
                                        className="actions-col">
                                        <span>
                                            <BsFillTrashFill
                                                className="delete-btn"
                                                onClick={()=> deleteSession(exercise.id)}
                                                title="Delete session"
                                            />
                                            <BsFillPencilFill
                                                className="edit-btn"
                                                onClick={()=> editSession(exercise.id)}
                                                title="Edit session"
                                            />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
            
        </div>
    )
}