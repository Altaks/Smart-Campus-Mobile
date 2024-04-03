const animationLogoEtTitreEtGraphique = () => {
    const logoRender = document.getElementById("logo")
    const titreRender = document.getElementById("titre")
    const listeGraphique = document.getElementById("listeGraphique")
    const changeSalle = document.getElementById("ChangeSalle")


    // Déplacement du logo vers la droite
    logoRender.classList.add("translate-x-[100vw]", "transition-all", "duration-1000")

    // Déplacement du titre vers la gauche
    titreRender.classList.add("-translate-x-[100vw]", "transition-all", "duration-1000")

    // Après que les animations de déplacement du logo et du titre soient terminées
    setTimeout(() => {
        // Disparition du logo
        logoRender.classList.remove("w-80", "my-16")
        logoRender.classList.add("w-0", "my-0")

        // Retrait de l'espacement au-dessus du titre
        changeSalle.classList.remove("mt-10")

        // Si le titre est sur 2 lignes, ajout d'un espacement relatif négatif au-dessus du titre
        if (titreRender.offsetHeight > 36) changeSalle.classList.add("-mt-10")

        // Déplacement du composant liste graphique vers la gauche
        listeGraphique.classList.remove("translate-x-[100vw]")
        listeGraphique.classList.add("transition-all", "duration-1000")
    }, 650)
}

export default animationLogoEtTitreEtGraphique