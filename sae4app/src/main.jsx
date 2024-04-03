import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Base from "./Base.jsx"
import ListeConseils from "./Routes/ListeConseils.jsx"
import Accueil from "./Routes/Accueil.jsx"

/**
 * Fonction qui change le titre de la page
 * @param localisation
 */
const changerTitre = (localisation) => {
  document.title = localisation + " | Smart Campus"
}

export {changerTitre}

/**
 * Définition du routeur de l'application
 * @type {Router} routeur de l'application
 */
const router = createBrowserRouter([{
  path: "/",
  element: <Base />,
  children: [
    {
      path: "/",
      element: <Accueil />,
    },
    {
      path: "/conseils",
      element: <ListeConseils />,
    }
  ]
}])

if(import.meta.env.MODE !== 'test'){ // On ne désactive pas le rendu pour les tests
  ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
  )
}
