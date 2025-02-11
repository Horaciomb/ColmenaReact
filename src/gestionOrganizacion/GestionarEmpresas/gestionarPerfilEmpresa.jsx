import React from "react";
import { MenuNavegador } from "../../_components/MenuNavegador";
import { PerfilEmpresa } from "./PerfilEmpresa";
export { gestionarPerfilEmpresa };
function gestionarPerfilEmpresa() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Organización", "Perfil de Empresa"]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <div >
          <h1 className="mt-4">Gestoinar Perfil de Empresa</h1>

          <PerfilEmpresa  idEmpresa={1} />
        </div>
      </div>
    </div>
  );
}
