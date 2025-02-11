import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { LinkedItems } from "../_components";

function LeftTabsExample() {
  const titlesPersonas = [
    "Gestionar Personas",
    "Gestionar Datos Contacto",
    "Asignar Cuenta Bancaria",
    "Gestionar Institución",
    "Asignar Formación",
    "Gestionar Empresas",
    "Asignar Experiencia Laboral",
  ];
  const linksPersonas = [
    "/personas",
    "/gestionarDatosContacto",
    "/gestionarCuentasBancarias",
    "/gestionarInstitucion",
    "/gestionarFormaciones",
    "/gestionarEmpresas",
    "/gestionarExperienciaLaboral",
  ];
  const titulosEmpleados = [
    "Gestionar Empleados",
    "Obtener Cargo",
    "Asignar Cargo",
    "Gestionar RC-IVA",
    "Gestionar Ingresos",
    "Gestionar Descuentos",
    "Gestionar Subsidios",
    "Gestionar Vacaciones",
    "Asignar Gestora",
  ];
  const linksEmpleados = [
    "/empleados",
    "/obtenerCargos",
    "/asignarCargos",
    "/GestionarRcivas",
    "/gestionarIngresos",
    "/gestionarDescuentos",
    "/gestionarSubsidios",
    "/gestionarVacaciones",
    "/gestionarAsignacionGestora",
  ];

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Persona</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Empleado</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <LinkedItems titles={titlesPersonas} links={linksPersonas} />
            </Tab.Pane>
            <Tab.Pane eventKey="second" >
              <LinkedItems titles={titulosEmpleados} links={linksEmpleados} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default LeftTabsExample;
