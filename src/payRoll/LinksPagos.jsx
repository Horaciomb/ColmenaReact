import ListGroup from 'react-bootstrap/ListGroup';
//import { Link } from 'react-router-dom';

function LinksPagos() {
  return (
    <ListGroup  >
      <ListGroup.Item action href="/pagosueldos">
        Pago de Sueldos
      </ListGroup.Item>
      <ListGroup.Item action href="/pagoaguinaldo">
        Pago Aguinaldos
      </ListGroup.Item>
      <ListGroup.Item action href="/pagoprimas">
        Pago Primas
      </ListGroup.Item>
      <ListGroup.Item action href="/pagoafiniquito">
        Pago Finiquito
      </ListGroup.Item>
      <ListGroup.Item action href="/boletadepago">
        Generar Boletas de Pagos
      </ListGroup.Item>
    </ListGroup>
  );
}

export default LinksPagos;