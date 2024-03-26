import {Outlet} from "react-router-dom";
import {HandHelping, Home} from "lucide-react";

const Base = () => {

    const accueilStyle = window.location.pathname === '/' ? "text-[#126CB5]" : "";
    const conseilStyle = window.location.pathname === '/conseils' ? "text-[#126CB5]" : "";

    return (
        <>
            <header className={"flex flex-row justify-evenly w-full my-3"}>
                <a className={`text-2xl ${accueilStyle} flex flex-row`} href={"/"}>
                    <Home className={"my-auto mr-3 h-6 w-6"}/>
                    Accueil
                </a>
                <a className={`text-2xl ${conseilStyle} flex flex-row`} href={"/conseils"}>
                    <HandHelping className={"my-auto mr-3 h-6 w-6"}/>
                    Conseils
                </a>
            </header>
            <hr/>
            <main className={"flex flex-col items-center overflow-hidden transition-all"}>
                <Outlet/>
            </main>
        </>
    )
}

export default Base