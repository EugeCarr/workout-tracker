"use client"
import { FC } from "react";
import  "../styles.css";
import { FaDumbbell } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface Props {
    first_name: string | undefined;
    showLinks: boolean;
}

const SiteBanner: FC<Props> = ({first_name, showLinks}): React.ReactNode => {
    const router = useRouter();

    const logout = async (): Promise<void> => {
        try{
            const logoutRes = await fetch(
                '/api/logoutUser',
            );
            const logout = await logoutRes.json();
            router.refresh()
        } catch(error){
            console.log(error)
            return
        }      
        return 
    }

    return (
        
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                width: "100vw"
            }}
        >           
            
            <div
                className="site-banner"
            >
                {
                    !!first_name?
                        <p className="bannerTitle">{`Welcome ${first_name}`}</p>
                    :
                        <p className="bannerTitle">Welcome to the workout Tracker</p>
                    
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
                <p className="bannerTitle">My workout Tracker</p>
            </div>
            <div className="site-banner-bar">
                {
                    showLinks && <Link
                        onClick={logout}
                        href={"/login"}
                        className="textLink"
                    >
                        <p
                            className="bannerSubtitle"
                        >
                            Log out
                        </p>
                    </Link>
                } 
            </div>
                
        </div>  
        
            
        
    )
}


export default SiteBanner
