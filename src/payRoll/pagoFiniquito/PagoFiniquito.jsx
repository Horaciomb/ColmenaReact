import React from "react";
import { FormPagoFiniquito } from "./FormPagoFiniquito";
import { MenuNavegador } from "../../_components/MenuNavegador";

export { PagoFiniquito };
function PagoFiniquito() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll", "Pago de Finiquito"]}
          links={["/", "/payRoll", ""]}
        />
        <h1>Pago de Finiquito</h1>
        <FormPagoFiniquito></FormPagoFiniquito>
      </div>
    </div>
  );
}
