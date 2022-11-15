import ListGroup from 'react-bootstrap/ListGroup';
//import { Link } from 'react-router-dom';

function LinkedPlanillas() {
  

  return (
    <ListGroup  >
      <ListGroup.Item action href="#link1">
        Planilla CSS
      </ListGroup.Item>
      <ListGroup.Item action href="#link2">
        Planilla AFP
      </ListGroup.Item>
      <ListGroup.Item action href="#link3">
        Planilla Tributaria
      </ListGroup.Item>
      <ListGroup.Item action href="#link4">
        Planilla Trimestrales
      </ListGroup.Item>
      <ListGroup.Item action href="#link5">
        Generar Reporte
      </ListGroup.Item>
    </ListGroup>
  );
}

export default LinkedPlanillas;