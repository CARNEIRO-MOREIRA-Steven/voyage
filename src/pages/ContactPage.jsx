import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { contactClient } from "../features/contact/contactSlice";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";


import { userInfo } from "../features/auth/authSlice";

// Création du schema de validation yup
// https://github.com/jquense/yup
// Ce schéma servira à vérifier les contraintes de validation du form
const searchSchema = yup.object({
    email : yup.string().required(),
    message : yup.string().required(),
});

function ContactPage() {


    const dispatch = useDispatch()
    const {status, error} = useSelector((state) => state.contact)

    const auth = useSelector((state) => state.auth);


    // Initialisation de react hook form
    const {
        register,
        // permet de connecter un champ au formulaire
        handleSubmit,
        // evenement lors de la soumission du form
        formState: { errors },
        reset
        // Object contenant les erreurs du form
    } = useForm({
        defaultValues: {
            email: '',
            message : '',
            name : '',
            subject: ''
        },
        resolver: yupResolver(searchSchema),
        // connexion du schéma yup au formulaire
        // Pour la validation des champs
    })

        useEffect(() => {
  dispatch(userInfo())
}, [dispatch])

useEffect(() => {
    if (auth.userInfo) {
        reset({
            email: auth.userInfo.email || '',
            name: auth.userInfo.username || '',
            subject: '',
            message: '',
            id : auth.userInfo.id
        })
    }
}, [auth.userInfo, reset])    

    // On filtre les destinations que l'on souhaite afficher selon la valeur de la recherche

    const onSubmit = async(data) => {

        try{
            await dispatch(contactClient(data)).unwrap()

        } catch(error){
            console.log(error.message)
        }
        // navigate(`/search?q=${encodeURIComponent(data.email)}`);
        // Navigation vers une nouvelle url
        // Exemple : /search?q=Japon
        // => on re render le composant sans recharger la page au sens propre

        // Intêret :
        // Persistance de l'url
        // Copier l'url
        // L'envoyer
        // La sauvegarder
        // Historique navigateur 
        // ...

        // Sinon on aurait pu utiliser un useState pour changer le contenu de la page mais dans ce cas : aucun historique possible
    }

    return (
        <section>
            <h1 className="mb-4 text-center">Demande de contact</h1>
            <h2 className="text-center">Contactez-nous</h2>
            <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="d-flex flex-column align-items-center text-center gap-3">
                    <Form className="form d-flex flex-column align-items-center text-center gap-3" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        <Form.Group controlId="message">
                            <Form.Label>
                                Votre message
                            </Form.Label>
                            {console.log(register("message"))}
                            <Form.Control
                                type="text"
                                placeholder="Envoyez nous votre demande"
                                isInvalid={!!errors.message}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("message")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>
                                Votre name
                            </Form.Label>
                            {console.log(register("name"))}
                            <Form.Control
                                type="text"
                                placeholder="Entret votre nom"
                                isInvalid={!!errors.name}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("name")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="subject">
                            <Form.Label>
                                Sujet
                            </Form.Label>
                            {console.log(register("subject"))}
                            <Form.Control
                                type="text"
                                placeholder="Sujet"
                                isInvalid={!!errors.subject}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("subject")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.subject?.message}
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

export default ContactPage;
