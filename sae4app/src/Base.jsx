import {Outlet} from "react-router-dom";
import APIIndisponible from "./APIIndisponible.jsx";

const Base = () => {
    return (
        <>
            <main className={"flex flex-col items-center overflow-hidden transition-all"}>
                <Outlet/>
            </main>
            <APIIndisponible/>
        </>
    )
}

export default Base