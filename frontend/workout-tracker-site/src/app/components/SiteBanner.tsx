"use client"
import { FC } from "react";
import  "../styles.css";
import { FaDumbbell } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";

interface Props {
    first_name: string | undefined;
    showLinks: boolean;
}

const SiteBanner: FC<Props> = ({first_name, showLinks}): React.ReactNode => {

    return (
        <div
            className="site-banner"
        >
            {
                !!first_name ? <><p>Welcome {first_name}</p></>: <><p>Welcome to the workout Tracker</p></>
            }  
            {
                showLinks &&
                <IconContext.Provider value={{className: "site-banner-icon", size:"2rem"}}>
                    <Link
                            href={"/"}
                        >
                        <FaHouseChimney
                            title="Home"

                        />
                    </Link>
                    <Link
                        href={"/myWorkouts"}
                    >
                        <FaCalendarAlt
                            title="My Workouts"

                        />
                    </Link>
                    <Link
                        href={"/exerciseLibrary"}
                    >
                        <FaDumbbell
                            title="Exercise Library"
                        />                 
                    </Link>
                    
                </IconContext.Provider> 
            }       
            <p>My workout Tracker</p>
        </div>
    )
}

export default SiteBanner
