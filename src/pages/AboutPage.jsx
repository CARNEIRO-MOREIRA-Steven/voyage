import { Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function AboutPage () {
    return (
        <section>
            <Card className="border-0 shadow-sm overflow-hidden">
                <Row className="g-0 align-items-center">
                    <Col md={6}>
                        <Card.Body className="p-5">
                            <p className="text-primary fw-bold mb-2">A propos de nous</p>
                            <h1 className="display-5 fw-bold">Une agence de voyage</h1>
                            <p className="lead text-muted">Découvrez chacunes de nos déestinations </p>
                            <Button as={Link} to='/' variant='outline-primary'>
                            Prendre contact</Button>
                        </Card.Body>
                    </Col>
                    <Col md={6}>
                        <img src="https://cdn.pixabay.com/photo/2016/11/18/19/10/beach-1836467_1280.jpg" alt="" className="home-image"/>
                    </Col>
                </Row>
            </Card>
        </section>
    );
}

export default AboutPage;
