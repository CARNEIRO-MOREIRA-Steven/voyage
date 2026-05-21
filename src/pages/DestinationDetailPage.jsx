import { Button, Card, Col, Row, Alert} from "react-bootstrap" 
import {Link , useParams} from 'react-router-dom'
import destinations from '../data/destinations'

const DestinationDetailPage = () => {

  const {slug} = useParams();
  console.log(slug)
  const destination = destinations.find((item) => item.slug === slug);
  console.log(destination)
  if(!destination){
    return (
      <Alert variant='warning'>
        <h1>Désolé cette destination n'existe pas</h1>
        <Button as={Link} to='/destinations'>Retour au destination</Button>
      </Alert>
    )
  }

  return (

    <Card className="border-0 shadow-sm overflow-hidden">
                <Row className="g-0 align-items-center ">
                        <Col md={6}>
                          <img src={destination.image} className="destination-image" alt="" />
                        </Col>
                        <Col md={6}>
                        <Card.Body className="p-5">
                          <h2>{destination.name}</h2>
                          <p>Région : {destination.region}</p>
                          <p>Capital : {destination.capital}</p>
                          <p>{destination.description}</p>
                        </Card.Body>
                        </Col>
                </Row>
            </Card>
  );

}

export default DestinationDetailPage