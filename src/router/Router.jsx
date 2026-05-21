// Avec React router, il est possible de déplacer la logique de navigation de notre projet dans un fichier dédié.
// Dans ce projet, one ne servira plus de App.jsx
// Avant : main.jsx => App.jsx => components/pages
// Sur ce projet : main.jsx => RouterProvider => Router.jsx => Layout/Pages.jsx

import { createBrowserRouter } from "react-router-dom"

// createBrowserRouter permet de créer un router moderne basé sur les urls du navigateur

import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage";
import DestinationsPage from '../pages/DestinationsPage'
import NotFoundPage from '../pages/NotFoundPage'
import DestinationDetailPage from "../pages/DestinationDetailPage";
import SearchPage from '../pages/SearchPage'
import ContactPage from '../pages/ContactPage'
import RegionPage from '../pages/RegionPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilPage from "../pages/ProfilPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from '../pages/Dashboard'
const reducer = createBrowserRouter([

    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        // Toutes les pages utilisent MainLayout
        children: [{
            index: true,
            // cette page est la page par defaut
            // index: true = path: ''
            element: <HomePage />
        },
        {
            path: '/about',
            element: <AboutPage />
        },
        {
            path: '/destinations',
            element: <DestinationsPage />
        },
        {
            path:'*',
            element: <NotFoundPage /> 
        },
        {
            path: 'destinations/:slug',
            element: <DestinationDetailPage />
        },
        {
            path: '/search',
            element: <SearchPage />
        },
        {
            path: '/contact',
            element: <ContactPage />
        },
        {path: 'destinations/:region',
            element: <RegionPage />
        },
        {path: '/login',
            element: <LoginPage />
        },
        {path: '/register',
            element: <RegisterPage />
        },
        {path: '/profil',
            element: <ProfilPage />
        },
        {
            path : '/dashboard',
            element: 
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        }

        

    
    ]
    },
]);

export default reducer