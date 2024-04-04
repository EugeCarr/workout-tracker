import { FC } from "react";
import { authDetails } from "../interfaces/interfaces";
import  "../styles.css";

interface Props {
    first_name: string | undefined
}

const SiteBanner: FC<Props> = ({first_name}): React.ReactNode => {

    return (
        <div
            className="site-banner"
        >
            {
                !!first_name ? <><p>Welcome {first_name}</p></>: <><p>Welcome to the workout Tracker</p></>
            }
            <p>My workout Tracker</p>
        </div>
    )
}

export default SiteBanner
