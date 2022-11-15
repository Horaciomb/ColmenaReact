import ListGroup from 'react-bootstrap/ListGroup';
//import { Link } from 'react-router-dom';

function LinksPagos() {
  return (
    <ListGroup  >
      <ListGroup.Item action href="/pagosueldos">
        Pago de Sueldos
      </ListGroup.Item>
      <ListGroup.Item action href="#link2">
        Pago Aguinaldos
      </ListGroup.Item>
      <ListGroup.Item action href="#link3">
        Pago Primas
      </ListGroup.Item>
      <ListGroup.Item action href="#link4">
        Pago Finiquito
      </ListGroup.Item>
      <ListGroup.Item action href="#link5">
        Generar Boletas de Pagos
      </ListGroup.Item>
    </ListGroup>
  );
}

export default LinksPagos;