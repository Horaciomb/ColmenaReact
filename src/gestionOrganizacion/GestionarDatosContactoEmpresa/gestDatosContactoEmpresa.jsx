import React from "react";
import { MenuNavegador } from "../../_components/MenuNavegador";
import { DatosContactoEmpresa } from ".";
export { gestDatosContactoEmpresa };
function gestDatosContactoEmpresa() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Organización", "Datos de Contacto"]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <div>
          <h1 className="mt-4">Gestoinar Datos Contacto de Empresa</h1>

          <DatosContactoEmpresa idEmpresa={1}/>
        </div>
      </div>
    </div>
  );
}
