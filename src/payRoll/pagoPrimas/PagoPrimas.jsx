import React from "react";

import FormPagoPrimas from "./FormPagoPrimas"
import { MenuNavegador } from "../../_components/MenuNavegador";

export { PagoPrimas };
function PagoPrimas() {
  return (
    <div className="p-4">
      <div className="container ">
      <MenuNavegador
          titles={["Inicio", "PayRoll", "Pago de Primas"]}
          links={["/", "/payRoll", ""]}
        />
        <h1>Pago de Primas</h1>
        <FormPagoPrimas></FormPagoPrimas>
      </div>
    </div>
  );
}
