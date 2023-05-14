import React from "react";
import BreadcrumbExample from "./BreadcrumbExample";
import {FormPagoFiniquito}  from "./FormPagoFiniquito";
export { PagoFiniquito };
function PagoFiniquito() {
    return (
        <div className="p-4">
          <div className="container ">
            <BreadcrumbExample></BreadcrumbExample>
            <h1>Pago de Finiquitos</h1>
            <FormPagoFiniquito></FormPagoFiniquito>
          </div>
        </div>
      );
}
