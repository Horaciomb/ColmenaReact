import React from "react";
import { MenuNavegador } from "../../_components";
import { FormRepCenCos } from ".";
export { RepCenCos };
function RepCenCos() {
  return (
    <div className="p-4">
      <div className="container">
        <MenuNavegador
          titles={[
            "Inicio",
            "Gestión de Organización",
            "Reporte de Centros de Costos",
          ]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <h1>Reporte Centro de Costos</h1>
        <FormRepCenCos idEmpresa={1}></FormRepCenCos>
      </div>
    </div>
  );
}
