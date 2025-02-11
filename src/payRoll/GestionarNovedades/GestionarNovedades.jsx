import React from "react";

import {MenuNavegador} from "../../_components";
import {LinkedItems} from "../../_components";

export { GestionarNovedades };
function GestionarNovedades() {
  const titulosNovedades = [
    "Porcentaje de Aporte de Vejez",
    "Porcentaje de Aporte Laboral Solidario",
    "Porcentaje de Aporte a Seguro a Corto Plazo",
    "Porcentaje de Aporte Nacional Solidario",
    "Porcentaje de Aporte Patronal Solidario",
    "Porcentaje de Bono de Antigüedad",
    "Porcentaje de Comisión por Administración",
    "Porcentaje de Aporte Riesgo Común",
    "Porcentaje de Impuesto Laboral RC-IVA",
    "Porcentaje Riesgo Profesional",
    "Porcentaje de Aporte Pro-Vivienda",
    "Salario Mínimo Nacional",
    "Monto de UFVs",
  ];
  
  const linksNovedades = [
    "/gestionarAporteVejez",
    "/gestionarAporteLaboralSolidario",
    "/gestionarAporteSeguro",
    "/gestionarAporteNacionalSolidario",
    "/gestionarAportePatronalSolidario",
    "/gestionarBonoAntiguedad",
    "/gestionarComisionAdministracion",
    "/gestionarAporteRiesgoComun",
    "/gestionarImpuestoRciva",
    "/gestionarRiesgoProfesional",
    "/gestionarAporteProVivienda",
    "/gestionarSalarioMinimo",
    "/gestionarMontoUfv",
  ];
  
  // Puedes usar estos arrays en tu componente para renderizar la lista
  
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll", "Gestionar Novedades"]}
          links={["/", "/payRoll", ""]}
        ></MenuNavegador>
        <h1>Gestionar Novedades</h1>
        <LinkedItems titles={titulosNovedades} links={linksNovedades} />
      </div>
    </div>
  );
}
