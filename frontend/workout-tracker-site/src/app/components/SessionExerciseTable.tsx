"use client";
import { format } from "path";
import { session, exercise } from "../interfaces/interfaces";
import React, { FC, useState, useEffect} from "react";
import { BsFillTrash2Fill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

interface Props {
    session: session;
    setIsExerciseModalOpen: (isOpen: boolean)=> void;
    setSelectedExercise: (exercise: exercise) => void;
    updateCounter: number
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
                    `/api/getSessionExercises${session_id}`
                )
                const exercises = await exercisesRes.json();
                SetListexercises(exercises)
                return 
            };            
            getSessionExercises(session.id);
            return
            }, [updateCounter]
    );
    const editSession = async (exercise_id: number): Promise<void> => {
        setTimeout(() => {
            console.log(`edit Session: ${exercise_id}`)
        }, 1000);
        const selectExercise = listexercises.find((ex)=> ex.id === exercise_id) || {} as exercise
        console.log(selectExercise)
        setSelectedExercise(selectExercise);
        setIsExerciseModalOpen(true);
        
        return 
    };

    const formatMuscleGroups = (exercise: exercise): string => {
        const muscleGroups = exercise.type?.muscleGroups;
        const string = muscleGroups?.reduce(
            (finalString, currentMg)=> {
                let newString = ""
                !!currentMg.name ? newString = finalString : newString = finalString + ", " + currentMg.name
                return newString
            },""
        );
        console.log(string)
        return string || ""
    }

    return (
        <>
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
                            <th>Movement</th>
                            <th>Muscle Groups</th>
                            <th>Sets</th>
                            <th>Repetitions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listexercises.map((exercise)=> {
                            return (
                                <tr key={exercise.id}>
                                    <td style={{
                                        width: "20vw"
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
                                    }}>{exercise.repetitions}</td>
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
            
        </>
    )
}