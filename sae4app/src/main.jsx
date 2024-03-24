import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Base from "./Base.jsx"
import ListeRecommandationsGenerales from "./ListeRecommandationsGenerales.jsx"
import Accueil from "./Accueil.jsx"

const router = createBrowserRouter([{
  path: "/",
  element: <Base />,
  children: [
    {
      path: "/",
      element: <Accueil />,
    },
    {
      path: "/recommandations",
      element: <ListeRecommandationsGenerales />,
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
