import { Container, Nav, Navbar as BootstrapNavbar, Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext";

// Redux
import { useDispatch, useSelector } from "react-redux"

import { logoutUser } from "../features/auth/authSlice"

function Navbar() {
    // const { isAuthenticated, user, logout } = useAuth()

    const { user } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const handleLogoutUser = () => {
        // localStorage.removeItem('token')
        // localStorage.removeItem('user')
        navigate('/')
        dispatch(logoutUser())
    }
    

    const navigate = useNavigate()
    // const handleLogout = () => {
    //     logout()
    //     navigate("/login")
    // }

    return (
        <BootstrapNavbar
            bg="primary"
            data-bs-theme="dark"
            expand="lg"
            className="shadow-sm"
        >
            <Container>
                <BootstrapNavbar.Brand as={NavLink} to="/">
                    Voyages
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="main-navbar" />
                <BootstrapNavbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">
                            Accueil
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/destinations">
                            Destinations
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/search">
                            Rechercher
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">
                            Contact
                        </Nav.Link>

                        {user ? (
                            <>
                                <Nav.Link as={NavLink} to="/profil" className="me-2">
                                    Profil
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    onClick={handleLogoutUser}
                                >
                                    Déconnexion
                                </Button> 
                            </>
                        ): (
                            <>
                                <Nav.Link as={NavLink} to="/register">
                                    Inscription
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/login">
                                    Connexion
                                </Nav.Link>                             
                            </>
                            )}

                    <Nav.Link as={NavLink} to="/about">
                        A propos
                    </Nav.Link>
                    
                    {user?.role === "admin" && (
                        <Nav.Link as={NavLink} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                    )}

                </Nav>
            </BootstrapNavbar.Collapse>
        </Container>
            </BootstrapNavbar >            
    )
}
export default Navbar