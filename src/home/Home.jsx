import { useRecoilValue } from "recoil";
//import GrillaCartas from './GrillaCartas'
import { Col, Row, Container } from "react-bootstrap";
import { Carta } from "../_components";
import { authAtom } from "_state";

export { Home };

function Home() {
  const auth = useRecoilValue(authAtom);
  const userRoles = auth?.roles || [];

  const shouldShowGestionPersonal = userRoles.includes("app-analistaPersonal");
  const shouldShowPayRoll = userRoles.includes("app-responsablePayRoll");
  const shouldShowKPI = userRoles.includes("app-gerenteRRHH");

  return (
    <div className="p-4">
      <div className="container  ">
        <h1>¡Hola {auth?.username}!</h1>
        <p>Bienvenido a Colmena</p>
        <Container>
          <Row>
            {shouldShowGestionPersonal && (
              <Col>
                <Carta
                  title="Gestión de Personal"
                  text="Modulo Gestión de Personal"
                  link="/gestionPersonal"
                />
              </Col>
            )}
            {shouldShowPayRoll && (
              <Col>
                <Carta title="PayRoll" text="Modulo PayRoll" link="/payRoll" />
              </Col>
            )}
            {shouldShowKPI && (
              <Col>
                <Carta title="KPI" text="Modulo KPI" link="/kpi" />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}
