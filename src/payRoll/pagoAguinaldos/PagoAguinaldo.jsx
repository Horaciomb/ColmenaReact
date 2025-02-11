import React from "react";

import FormPagoAguinaldo from "./FormPagoAguinaldo";
import { MenuNavegador } from "../../_components/MenuNavegador";

export { PagoAguinaldo };
function PagoAguinaldo() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll", "Pago de Aguinaldos"]}
          links={["/", "/payRoll", ""]}
        />
        <h1>Pago de Aguinaldos</h1>
        <FormPagoAguinaldo></FormPagoAguinaldo>
      </div>
    </div>
  );
}
