import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";



import { useSelector, useDispatch } from 'react-redux';

import { updateProfil } from '../features/user/userSlice';
import { registerUser } from "../features/auth/authSlice";
import { getUser } from '../features/user/userSlice';


import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

    const updateSchema = yup.object({
        username: yup
            .string()
            .required("Le login est obligatoire")
            .min(4, "Le login doit avoir 4 caractères"),
        email: yup
            .string()
            .required("L'adresse email est obligatoire")
            .matches(/[@]/, "L'adresse email doit contenir un @")
            .matches(/[.]/, "L'adresse email doit contenir un ."),
        firstName: yup
            .string()
            .required(),
        lastName: yup
            .string()
            .required(),
        gender: yup
            .string(),
        avatar: yup
            .string()
    });

function ProfilPage () {

    const [isEditing, setIsEditing] = useState(false)

    const { currentUser} = useSelector((state) => state.user);


    const dispatch = useDispatch()

    // const userInfo = user.JSON.parse()

    // const user = JSON.parse(localStorage.getItem("user"));

    // const token = localStorage.getItem('token');

    // const [profil, setProfil] = useState(null);

    // const me = async () => {

    //     try {

    //         const response = await fetch(
    //             'https://dummyjson.com/user/me',
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 },
    //                 credentials: 'include'
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error("Identifiants incorrects");
    //         }

    //         const result = await response.json();

    //         console.log(result);

    //         setProfil(result);

    //     } catch(error) {

    //         console.log(error);

    //     }
    // };

    // // lancer UNE fois
    // useEffect(() => {

    //     if(token){
    //         me();
    //     }

    // }, []);

    // attente chargement
    if (!currentUser) {
        return <p>Aucun utilisateur connecté.</p>;
    }

    const openModification = () => {
        console.log('tu clique sur le btn')
        setIsEditing(true)
    }



    const {
        register,
        // permet de connecter un champ au formulaire
        handleSubmit,
        // evenement lors de la soumission du form
        formState: { errors },
        // Object contenant les erreurs du form
    } = useForm({
        defaultValues: {
    username: currentUser?.username || "",
    password: "",
    email: currentUser?.email || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    genred: currentUser?.gender || "",
    avatar: currentUser?.avatar || ""
},
        resolver: yupResolver(updateSchema),
        // connexion du schéma yup au formulaire
        // Pour la validation des champs
    })

    const onSubmit = async(data) => {

        try {

            await dispatch(updateProfil(data)).unwrap()
            setIsEditing(false);
            // .unwrap() est une méthode de Redux toolkit
            // Succès : retourne les données (payload)
            // Echec : throw error

            // Exemple de réponse Redux : 
            // {
            //     type : "auth.loginUser/fullfilled" , // success
            //     payload : ...
            // }
            

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <section>

            <Card className="border-0 shadow-sm overflow-hidden">

                <Row className="g-0 align-items-center">
                    <Col md={12}>
                        <h1 className="text-center">
                            Votre profil
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className='d-flex justify-content-center flex-column'>

                        <h2 className="g-0 p-2">Bonjour {currentUser.firstName} {currentUser.lastName}</h2>

                        <p className="g-0 p-2">Votre username : {currentUser.username}</p>

                        <p className="g-0 p-2">Votre email : {currentUser.email}</p>

                        <p className="g-0 p-2">Votre genre : {currentUser.gender}</p>

                    </Col>
                    <Col md={6}>

                        <img
                            src={currentUser.image}
                            alt="profil"
                            className='avatar-profil'
                        />

                    </Col>
                </Row>
                <Button className='primary' onClick={openModification}>Modifier le profil</Button>
                {
                    isEditing && (
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Form.Group controlId="username">
                                    <Form.Label>
                                        Votre username
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={currentUser.username}
                                        isInvalid={!!errors.username}
                                        // isInvalid : bordure rouge, style d'erreur de bootstrap
                                        // !! pour obtenir un booléen
                                        {...register("username")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>
                                        Votre adresse mail
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={currentUser.email}
                                        isInvalid={!!errors.email}
                                        // isInvalid : bordure rouge, style d'erreur de bootstrap
                                        // !! pour obtenir un booléen
                                        {...register("email")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="firstName">
                                    <Form.Label>
                                        Votre nom
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={currentUser.firstName}
                                        isInvalid={!!errors.firstName}
                                        // isInvalid : bordure rouge, style d'erreur de bootstrap
                                        // !! pour obtenir un booléen
                                        {...register("firstName")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>
                                        Votre prénom
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={currentUser.lastName}
                                        isInvalid={!!errors.lastName}
                                        // isInvalid : bordure rouge, style d'erreur de bootstrap
                                        // !! pour obtenir un booléen
                                        {...register("lastName")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="gender">
                                    <Form.Label>
                                        Homme ou Femme
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={currentUser.gender}
                                        isInvalid={!!errors.gender}
                                        // isInvalid : bordure rouge, style d'erreur de bootstrap
                                        // !! pour obtenir un booléen
                                        {...register("gender")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.gender?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="avatar">
                                    <Form.Label>
                                        Avatar
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={currentUser.avatar}
                                        isInvalid={!!errors.avatar}
                                        // isInvalid : bordure rouge, style d'erreur de bootstrap
                                        // !! pour obtenir un booléen
                                        {...register("avatar")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.avatar?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="outline-primary"
                                    className="mt-2"
                                >
                                    Modifier
                                </Button>
                            </Form>
                        </Card.Body>
                    )
                }
            </Card>

        </section>
    );
};

export default ProfilPage;