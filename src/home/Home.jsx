import { useRecoilValue } from "recoil";
//import GrillaCartas from './GrillaCartas'
import { Col, Row } from "react-bootstrap";
import { Carta } from "../_components";
import { authAtom } from "_state";
import gestionPersonal from "../assets/img/gestionPersonal.jpg";
export { Home };

function Home() {
  const auth = useRecoilValue(authAtom);
  console.log(auth);
  const userRoles = auth?.roles || [];
  const isAdmin = userRoles.includes("app-gerenteGeneral");
  const isAnalistaPersonal = userRoles.includes("app-analistaPersonal");
  const isGerenteRRHH = userRoles.includes("app-gerenteRRHH");
  const isResponsablePayRoll = userRoles.includes("app-responsablePayRoll");

  const modulos = [
    {
      title: "Administración de Personal",
      //text:"Módulo Administración de Personal",
      link: "/gestionPersonal",
      img: gestionPersonal,
    },
    {
      title: "PayRoll",
      link: "/payRoll",
      //text:"Módulo PayRoll",
      img: gestionPersonal,
    },
    {
      title: "KPI",
      //text:"Módulo KPI",
      link: "/kpi",
      img: gestionPersonal,
    },
     {
      title: "Gestión de Organización",

       link: "/gestionOrganizacion",
       img: gestionPersonal,
     },
     {
       title: "Gestión de Capacitación",

       link: "/gestionCapacitacion",
       img: gestionPersonal,
     },
     {
       title: "Desarrollo de Personal",

       link: "/desarrolloPersonal",
       img: gestionPersonal,
     },
    // Agregar más módulos si es necesario
  ];
  return (
    <div className="p-4">
      <div className="container ">
        <h1>¡Hola {auth?.name}!</h1>
        <p>Bienvenido a Colmena</p>
        <div className="mb-4">
          <Row xs={1} md={3} className="g-4">
            {isAdmin && (
              <>
                {modulos.map((modulo, index) => (
                  <Col className="mb-3" key={index}>
                    <Carta
                      title={modulo.title}
                      text={modulo.text}
                      link={modulo.link}
                      img={modulo.img}
                    />
                  </Col>
                ))}
              </>
            )}
            {isAnalistaPersonal && (
              <>
                <Col className="mb-3">
                  <Carta
                    title="Gestión de Personal"
                    text="Módulo Gestión de Personal"
                    link="/gestionPersonal"
                    img={gestionPersonal}
                  />
                </Col>
                {/* <Col className="mb-3">
                  <Carta
                    title="Gestión de Organización"
                    text="Módulo para la gestión de la Organización"
                    link="/gestionOrganizacion"
                    img={gestionPersonal}
                  />
                </Col> */}
              </>
            )}
            {isGerenteRRHH && (
              <>
                <Col className="mb-3">
                  <Carta
                    title="KPI"
                    text="Módulo KPI"
                    link="/kpi"
                    img={gestionPersonal}
                  />
                </Col>
                {/* <Col className="mb-3">
                  <Carta
                    title="Gestión de Capacitación"
                    text="Módulo para la gestión de capacitación"
                    link="/gestionCapacitacion"
                    img={gestionPersonal}
                  />
                </Col>
                <Col className="mb-3">
                  <Carta
                    title="Desarrollo de Personal"
                    text="Módulo para el desarrollo de personal"
                    link="/desarrolloPersonal"
                    img={gestionPersonal}
                  />
                </Col> */}
              </>
            )}
            {isResponsablePayRoll && (
              <Col className="mb-3">
                <Carta
                  title="PayRoll"
                  text="Módulo PayRoll"
                  link="/payRoll"
                  img={gestionPersonal}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}
