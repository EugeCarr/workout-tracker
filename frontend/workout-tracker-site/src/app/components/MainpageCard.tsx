"use client"
import  "../styles.css";
import {
    Card, Flex, Image, background, textDecoration
} from "@chakra-ui/react";
import React, {  FC, useState} from "react";
import { useRouter } from "next/navigation";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { mainPageCardDetails } from "../interfaces/interfaces";
import Link from "next/link";
import { getStylesConstants } from "../utils";
import  "../styles.css";

export const MainpageCard: FC<mainPageCardDetails> = ({
    title, photoSrc, description, pageRoute
}): React.ReactNode => {
    // const bodyElement: HTMLBodyElement = document.querySelector('body');    
    // console.log(window.getComputedStyle(bodyElement))
    return (
        <Link
            href={pageRoute}
            style={{textDecoration: 'none'}}
        >
            <Card
                backgroundColor="#141414"
                borderRadius="1rem"
                paddingLeft="2rem"
                paddingRight="2rem"
                width="20rem"
                margin="5rem"
                className="link-card"
            >
                <Flex
                    direction="column"
                    alignItems="center"
                >
                    <p
                        className="title"
                    >
                        {title}
                    </p>
                    <Image
                        src={photoSrc}
                    />
                    <p                
                    >
                        {description}
                    </p>
                </Flex>

            </Card>        
        </Link>
    )
}