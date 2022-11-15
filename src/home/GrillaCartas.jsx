import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import CartaGestionPersonal from './CartaGestionPersonal'
import CartaPayRoll from './CartaPayRoll'
import CartaKPI from './CartaKPI'

function GrillaCartas() {
  return (
    <Container >
      <Row>
        <Col>
            <CartaGestionPersonal></CartaGestionPersonal>
        </Col>
        <Col>
            <CartaPayRoll></CartaPayRoll>
        </Col>
        <Col>
            <CartaKPI></CartaKPI>
        </Col>
      </Row>
      <br></br>
      <Row>
        
        <Col></Col>
      </Row>
    </Container>
  );
}

export default GrillaCartas;