"use client"
import  "../styles.css";
import React, { FC} from "react";
import { signupDetails} from "../interfaces/interfaces";

interface Props {
    buttonAction: ()=> Promise<void>;
    formTitle: string;
    buttonText: string;
    signup: signupDetails;
    setSignUp: (signupVal: signupDetails) => void;
    errorMessages: string[];
    badSignup: string;
}

const CreateUserForm: FC<Props> = ({buttonAction, formTitle, buttonText, signup, setSignUp, errorMessages, badSignup}): React.ReactNode => {    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {        
        setSignUp(
            {
                ...signup,
                [e.target.name]: e.target.value
            }
        )
    };

    return (

        <div
            className="form-card"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}           
        >
            <div 
                id="create-workout-plan"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }} 
            >
                <p className="title">{formTitle}</p>
                {
                    !!errorMessages && errorMessages.map(
                        (msg, index) => {
                            return (
                                React.cloneElement(
                                    <p className="formErrorMessage" key={index}>{msg}</p>
                            ))
                        }
                    )
                }
                <label htmlFor="first_name" className="standard-form-label">Firstname: </label>
                <input
                    name="first_name"
                    id="first_name"
                    type="text"
                    required
                    className="form-input"
                    value={signup.first_name}
                    onChange = {(e) => {handleChange(e)}}
                    placeholder="Firstname"
                />  
                <label htmlFor="last_name" className="standard-form-label">Surname: </label>
                <input
                    name="last_name"
                    id="last_name"
                    type="text"
                    required
                    className="form-input"
                    value={signup.last_name}
                    onChange = {(e) => {handleChange(e)}}
                    placeholder="Surname"
                />   
                <label htmlFor="email" className="standard-form-label">Email: </label>
                <input
                    name="email"
                    id="email"
                    type="text"
                    required
                    className="form-input"
                    value={signup.email}
                    onChange = {(e) => {handleChange(e)}}
                    placeholder="Email"
                />   
                <label htmlFor="password" className="standard-form-label">Surname: </label>
                <input
                    name="password"
                    id="password"
                    type="text"
                    required
                    className="form-input"
                    value={signup.password}
                    onChange = {(e) => {handleChange(e)}}
                    placeholder="Password"
                />   
                <label htmlFor="re_password" className="standard-form-label">Re-type password: </label>
                <input
                    name="re_password"
                    id="re_password"
                    type="text"
                    required
                    className="form-input"
                    value={signup.re_password}
                    onChange = {(e) => {handleChange(e)}}
                    placeholder="Re-type password"
                />                  
                {
                    !!badSignup && <p className="formErrorMessage">{badSignup}</p>
                }
                
                <button
                    name="form-button"
                    className="form-button"
                    disabled={!signup.first_name || !signup.last_name || !signup.email|| !signup.password || !signup.re_password}
                    onClick={buttonAction}
                >{buttonText}
                </button>
            </div>

        </div>
    )
}

export default CreateUserForm