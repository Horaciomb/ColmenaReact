import ListGroup from 'react-bootstrap/ListGroup';
//import { Link } from 'react-router-dom';

function LinkedExample() {
  

  return (
    <ListGroup  >
      <ListGroup.Item action href="/personas">
        Gestionar Personas
      </ListGroup.Item>
      <ListGroup.Item action href="/Afps">
        Gestionar AFP
      </ListGroup.Item>
      <ListGroup.Item action href="#link3">
        Gestionar Bancos
      </ListGroup.Item>
      <ListGroup.Item action href="#link4">
        Gestionar Institucion
      </ListGroup.Item>
      <ListGroup.Item action href="#link5">
        Gestionar Experiencia Laboral
      </ListGroup.Item>
      <ListGroup.Item action href="#link6">
        Gestionar Documentos
      </ListGroup.Item>
      <ListGroup.Item action href="#link7">
        Gestionar Datos Contacto
      </ListGroup.Item>
    </ListGroup>
  );
}

export default LinkedExample;