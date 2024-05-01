"use client"
import  "../styles.css";
import React, {  FC, useState} from "react";
import { useRouter } from "next/navigation";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { mainPageCardDetails } from "../interfaces/interfaces";
import Link from "next/link";
import { getStylesConstants } from "../utils";
import  "../styles.css";

export const MainpageCard: FC<mainPageCardDetails> = ({
    title, photoSrc, description, pageRoute, altText
}): React.ReactNode => {

    return (
        <Link
            href={pageRoute}
            style={{textDecoration: 'none'}}
        >
            <div
                style={{
                    backgroundColor:"#141414",
                    borderRadius:"1rem",
                    paddingLeft:"2rem",
                    paddingRight:"2rem",
                    width:"20rem",
                    margin:"5rem",
                }}
                className="link-card"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}
                >
                    <p
                        className="title"
                    >
                        {title}
                    </p>
                    <img
                        src={photoSrc}
                        style={
                            {
                                width: "18rem",
                                height: "18rem"
                            }
                        }
                        alt={altText}
                    />
                    <p                
                    >
                        {description}
                    </p>
                </div>

            </div>        
        </Link>
    )
}