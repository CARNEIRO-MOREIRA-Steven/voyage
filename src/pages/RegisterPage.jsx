import { Button, Card, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../features/auth/authSlice";

// Création du schema de validation yup
// https://github.com/jquense/yup
// Ce schéma servira à vérifier les contraintes de validation du form
const searchSchema = yup.object({
    username: yup
    .string()
    .required("Le login est obligatoire")
    .min(4, "Le login doit avoir 4 caractères"),
    password: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule'),
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
    genred: yup
    .string(),
    avatar: yup
    .string()
});

// username (text)
    //     - string, requis, 4 caractères minimum
    // - email (email)
    //     - string, requis, type email
    // - password (password)
    //     - string, requis, 8 caractères minimum, minimum : 1 minuscule, 1 majuscule, 1 chiffre et 1 caractères spécial
    // - firstName (text)
    //     - string, requis
    // - lastName (text)
    //     - string, requis
    // - gender (select)
    //     - string, null
    // - avatar (champs text => url)
    //     - string, null, url

function RegisterPage() {

    const dispatch = useDispatch()
    const {status, error} = useSelector((state) => state.auth)

    // Initialisation de react hook form
    const {
        register,
        // permet de connecter un champ au formulaire
        handleSubmit,
        // evenement lors de la soumission du form
        formState: { errors },
        // Object contenant les erreurs du form
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            genred: "",
            avatar: ""
        },
        resolver: yupResolver(searchSchema),
        // connexion du schéma yup au formulaire
        // Pour la validation des champs
    })

    // On filtre les destinations que l'on souhaite afficher selon la valeur de la recherche
    const navigate = useNavigate()

    const onSubmit = async (data) => {

       try {
       
                   await dispatch(registerUser(data)).unwrap()
                   // .unwrap() est une méthode de Redux toolkit
                   // Succès : retourne les données (payload)
                   // Echec : throw error
       
                   // Exemple de réponse Redux : 
                   // {
                   //     type : "auth.loginUser/fullfilled" , // success
                   //     payload : ...
                   // }
                   
                   navigate("/login")
               } catch(error) {
                   console.log(error.message)
               }
           }

    

    return (
        <section>
            <h1 className="mb-4 text-center">Inscription</h1>
            <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="d-flex flex-column align-items-center text-center gap-3">
                    <Form onSubmit={handleSubmit(onSubmit)} className="form d-flex flex-column align-items-center text-center gap-3" noValidate>
                        <Form.Group controlId="username">
                            <Form.Label>
                                Votre username
                            </Form.Label>
                            {console.log(register("username"))}
                            <Form.Control
                                type="text"
                                placeholder="Veuillez renseigner un username valide"
                                isInvalid={!!errors.username}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("username")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>
                                Votre mot de passe
                            </Form.Label>
                            {console.log(register("password"))}
                            <Form.Control
                                type="text"
                                placeholder="Envoyez nous votre demande"
                                isInvalid={!!errors.password}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("password")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>
                                Votre adresse mail
                            </Form.Label>
                            {console.log(register("email"))}
                            <Form.Control
                                type="text"
                                placeholder="Veuillez renseigner une adresse mail valide"
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
                            {console.log(register("firstName"))}
                            <Form.Control
                                type="text"
                                placeholder="Veuillez renseigner votre nom"
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
                            {console.log(register("lastName"))}
                            <Form.Control
                                type="text"
                                placeholder="Veuillez renseigner votre prénom"
                                isInvalid={!!errors.lastName}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("lastName")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="genred">
                            <Form.Label>
                                Homme ou Femme
                            </Form.Label>
                            {console.log(register("genred"))}
                            <Form.Control
                                type="text"
                                placeholder="Homme ou Femme"
                                isInvalid={!!errors.genred}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("genred")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.genred?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="avatar">
                            <Form.Label>
                                Avatar
                            </Form.Label>
                            {console.log(register("avatar"))}
                            <Form.Control
                                type="text"
                                placeholder="Veuillez choisir un avatar (url)"
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
                            Envoyer
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </section>
    );
}

export default RegisterPage;
