import { Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

import Destions from '../data/destinations.js'

function DestinationsPage () {
    return (
        <section>
            <Card className="border-0 shadow-sm overflow-hidden">
                <Row className="g-0 align-items-center ">
                  <Col md={6}>                    
                  <h1 className="text-center">Découvrir nos destinations</h1>
                  </Col>
                    {Destions.map((destination, index) => (
                      <div className="d-flex g-5" key={index}>
                        <Col md={6}>
                        <Card.Body className="p-5">
                          <h2>{destination.name}</h2>
                          <Button as={Link} to={`${destination.region}`}>{destination.region}</Button>
                          <p>{destination.capital}</p>
                          <p>{destination.description}</p>
                          <Button as={Link} to={`/destinations/${destination.slug}`}>Voir le détail</Button>
                        </Card.Body>
                        </Col>
                        <Col md={6}>
                          <img src={destination.image} className="destination-image" alt="" />
                        </Col>
                        </div>
                        ))}
                </Row>
            </Card>
        </section>
    );
}

export default DestinationsPage;
