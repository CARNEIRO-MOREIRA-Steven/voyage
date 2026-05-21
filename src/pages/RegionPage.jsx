import { Button, Card, Col, Row, Alert} from "react-bootstrap" 
import {Link , useParams} from 'react-router-dom'
import destinations from '../data/destinations'



const RegionPage = () => {

    const {regions} = useParams();
    const region = destinations.find((item) => item.region === regions )
    console.log(region)

    if(!region){
    return (
      <Alert variant='warning'>
        <h1>Désolé cette région n'existe pas</h1>
        <Button as={Link} to='/destinations'>Retour au destination</Button>
      </Alert>
    )
  }

  return (
    <div>RegionPage</div>
  )
}

export default RegionPage