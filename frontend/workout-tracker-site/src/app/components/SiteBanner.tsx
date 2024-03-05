import { FC } from "react";
import { authDetails } from "../interfaces/interfaces";
import  "../styles.css";

const SiteBanner: FC<authDetails > = ({username}): React.ReactNode => {

    return (
        <div
            className="site-banner"
        >
            {
                !!username ? <><p>Welcome {username}</p></>: <><p>Welcome to the workout Tracker</p></>
            }
            <p>My workout Tracker</p>
        </div>
    )
}

export default SiteBanner
