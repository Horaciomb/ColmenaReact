import React from "react";
import { MenuNavegador } from "../../_components";
import { FormMapagrama } from ".";
export { GenerarMapagrama };
function GenerarMapagrama() {
  return (
    <div className="p-4">
      <div className="container">
        <MenuNavegador
          titles={[
            "Inicio",
            "Gestión de Organización",
            "Generar Mapagrama",
          ]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <h1>Generar Mapagrama</h1>
        <FormMapagrama idEmpresa={1}></FormMapagrama>
      </div>
    </div>
  );
}
