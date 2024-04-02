const animationLogoEtTitreEtGraphique = () => {
    document.getElementById("logo").classList.add("translate-x-[100vw]", "transition-all", "duration-1000")
    const titreRender = document.getElementById("titre")
    titreRender.classList.add("-translate-x-[100vw]", "transition-all", "duration-1000")

    setTimeout(() => {
        document.getElementById("logo").classList.remove("w-80", "my-16")
        document.getElementById("logo").classList.add("w-0", "my-0")
        document.getElementById("ChangeSalle").classList.remove("mt-10")
        if (titreRender.offsetHeight > 36) document.getElementById("ChangeSalle").classList.add("-mt-10") // Si le titre est sur 2 lignes
        document.getElementById("listeGraphique").classList.remove("translate-x-[100vw]")
        document.getElementById("listeGraphique").classList.add("transition-all", "duration-1000")
    }, 650)
}

export default animationLogoEtTitreEtGraphique