import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function ListaNovedades() {
  return (
    <ListGroup 
      style={{
        maxHeight: "400px",
        overflow: "auto",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        marginRight: "10px",
      }}
    >
      <ListGroup.Item action href="/gestionarAporteVejez">
        Porcentaje de Aporte de Vejez
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarAporteLaboralSolidario">
        Porcentaje de Aporte Laboral Solidario
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarAporteSeguro">
        Porcentaje de Aporte a Seguro a Corto Plazo
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarAporteNacionalSolidario">
        Porcentaje de Aporte Nacional Solidario
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarAportePatronalSolidario">
        Porcentaje de Aporte Patronal Solidario
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarBonoAntiguedad">
        Porcentaje de Bono de Antigüedad
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarComisionAdministracion">
        Porcentaje de Comision por Administracion
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarAporteRiesgoComun">
        Porcentaje de Aporte Riesgo Común
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarImpuestoRciva">
        Porcentaje de Impuesto Laboral RC-IVA
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarRiesgoProfesional">
        Porcentaje Riesgo Profesional
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarAporteProVivienda">
        Porcentaje de Aporte Pro-Vivienda
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarSalarioMinimo">
        Salario Mínimo Nacional
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarMontoUfv">
        Monto de UFVs
      </ListGroup.Item>
    </ListGroup>
  );
}

export default ListaNovedades;
