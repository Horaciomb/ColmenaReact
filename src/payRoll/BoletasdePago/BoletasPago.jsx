import React from "react";
import BreadcrumbExample from "./BreadcrumbExample";
import FormBoletaPago from "./FormBoletaPago";
export { BoletasPago };
function BoletasPago() {
  return (
    <div className="p-4">
      <div className="container ">
        <BreadcrumbExample></BreadcrumbExample>
        <h1>Generar Boletas de Pago</h1>
        <FormBoletaPago></FormBoletaPago>
      </div>
    </div>
  );
}
