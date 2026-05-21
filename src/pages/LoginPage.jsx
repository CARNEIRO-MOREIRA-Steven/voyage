import { Button, Card, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

import { loginUser } from "../features/auth/authSlice";

// username - password
// emilys - emilyspass


const loginSchema = yup.object({
    username: yup
        .string()
        .required("Le login est obligatoire"),
    password: yup
        .string()
        .required("Le mot de passe est obligatoire"),
});
function LoginPage() {

    const navigate = useNavigate()
    // const { login } = useAuth();
    // const [apiError, setApiError] = useState("")

    const dispatch = useDispatch()
    const { status, error } = useSelector((state) => state.auth)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const onSubmit = async (data) => {
        // setApiError("");

        try {

            await dispatch(loginUser(data)).unwrap()
            // .unwrap() est une méthode de Redux toolkit
            // Succès : retourne les données (payload)
            // Echec : throw error

            // Exemple de réponse Redux : 
            // {
            //     type : "auth.loginUser/fullfilled" , // success
            //     payload : ...
            // }

            navigate("/profil")
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <Card className="mx-auto w-100 h-100 shadow-sm border-0">
            <Card.Body className="d-flex flex-column align-items-center text-center gap-3">
                <h1 className="mb-3 pb-3 border-bottom text-center">Connexion</h1>
                <Form className="form d-flex flex-column align-items-center text-center gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="username">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Votre login"
                            isInvalid={!!errors.username}
                            {...register("username")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Votre Mot de passe"
                            isInvalid={!!errors.password}
                            {...register("password")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="outline-primary"
                        className="mt-2"
                    >
                        Connexion
                    </Button>
                </Form>
                {error && (
                    <Alert className="mt-2" variant="danger">
                        {error}
                    </Alert>
                )}
            </Card.Body>
        </Card>
    )
}

export default LoginPage
