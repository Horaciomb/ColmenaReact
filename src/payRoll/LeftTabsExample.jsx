import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { LinkedItems } from "../_components";
//import Sonnet from '../../components/Sonnet';
const titulos = [
  "Pago de Sueldos",
  "Pago de Aguinaldos",
  "Pago de Primas",
  "Pago de Finiquito",
  "Generar de Boletas de Pagos",
];

const links = [
  "/pagosueldos",
  "/pagoaguinaldo",
  "/pagoprimas",
  "/pagoafiniquito",
  "/boletadepago",
];

const titulosGestion = [
  "Gestionar Primas",
  "Gestionar Novedades",
  "Procesar Incremento Salarial",
];

const linksGestion = [
  "/gestionarPrimas",
  "/gestionarNovedades",
  "/procesarIncrementoSalarial",
];

// Puedes usar estos arrays en tu componente para renderizar la lista

// Puedes usar estos arrays en tu componente para renderizar la lista

function LeftTabsExample() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Pagos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Porcentajes</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <LinkedItems titles={titulos} links={links} />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <LinkedItems titles={titulosGestion} links={linksGestion} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default LeftTabsExample;
