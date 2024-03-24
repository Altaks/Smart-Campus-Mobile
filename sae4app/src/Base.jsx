import {Outlet} from "react-router-dom";

const Base = () => {
    return (
        <>
            <main className={"flex flex-col items-center overflow-hidden transition-all"}>
                <Outlet/>
            </main>
        </>
    )
}

export default Base