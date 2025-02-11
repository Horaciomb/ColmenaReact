import React from "react";
import FormBoletaPago from "./FormBoletaPago";
import { MenuNavegador } from "../../_components/MenuNavegador";
export { BoletasPago };
function BoletasPago() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll", "Generar Boletas de Pago"]}
          links={["/", "/payRoll", ""]}
        />
        <h1>Generar Boletas de Pago</h1>
        <FormBoletaPago></FormBoletaPago>
      </div>
    </div>
  );
}
