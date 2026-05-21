import { Button, Card, Col, Row, Badge, Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import  destinations from "../data/destinations";

// Création du schema de validation yup
// https://github.com/jquense/yup
// Ce schéma servira à vérifier les contraintes de validation du form
const searchSchema = yup.object({
    keyword: yup
        .string() // ça doit une chaine de caractères
        .required("Veuillez saisir une recherche")
        .min(2, "La recherche doit avoir au moins 2 caractères"),
});

function SearchPage() {

    const navigate = useNavigate();
    // pour mettre en place une url qui contiendra la saisie de la recherche sous forme d'argument get

    const [searchParams] = useSearchParams();
    // nous permet de récupérer un ou des params get de l'url

    const currentSearch = searchParams.get("q") || "";

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
            keyword: currentSearch,
        },
        resolver: yupResolver(searchSchema),
        // connexion du schéma yup au formulaire
        // Pour la validation des champs
    })

    // On filtre les destinations que l'on souhi=aite afficher selon la valeur de la recherche
    const destinationsList = destinations.filter((destination) => {
        const search = currentSearch.toLowerCase();
        return (
            destination.name.toLowerCase().includes(search) ||
            destination.region.toLowerCase().includes(search) ||
            destination.capital.toLowerCase().includes(search)
        );
    });

    const onSubmit = (data) => {
        navigate(`/search?q=${encodeURIComponent(data.keyword)}`);
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
            <h1 className="mb-4">Rechercher une destination</h1>
            <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group controlId="keyword">
                            <Form.Label>
                                Votre recherche
                            </Form.Label>
                            {console.log(register("keyword"))}
                            <Form.Control
                                type="text"
                                placeholder="Exemple: France, Japon, Eruope, Paris ..."
                                isInvalid={!!errors.keyword}
                                // isInvalid : bordure rouge, style d'erreur de bootstrap
                                // !! pour obtenir un booléen
                                {...register("keyword")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.keyword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="outline-primary"
                            className="mt-2"
                        >
                            Rechercher
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {currentSearch && (
                <>
                    <h2 className="h4 mb-3">Résultat de la recherche</h2>

                    {destinationsList.length > 0 ? (
                        <Row className="g-4">
                            {destinationsList.map((destination) => (
                                <Col md={6} lg={4} key={destination.id}>
                                    <Card className="h-100 shadow-sm border-0 destination-card">
                                        <Card.Img
                                            variant="top"
                                            src={destination.image}
                                            alt={destination.name}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <div className="mb-2">
                                                <Badge bg="primary">
                                                    {destination.region}
                                                </Badge>
                                            </div>
                                            <Card.Title>
                                                {destination.name}
                                            </Card.Title>
                                            <Card.Text className="text-muted">
                                                <span className="fw-bold">Capitale :</span> {destination.capital}
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to={`/destinations/${destination.slug}`}
                                                variant="outline-primary"
                                                className="mt-3"
                                            >
                                                Voir le détail
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Alert variant="warning">
                            Auncun résultat ne correspond à votre recherche.
                        </Alert>
                    )}
                </>
            )}
        </section>
    );
}

export default SearchPage;
