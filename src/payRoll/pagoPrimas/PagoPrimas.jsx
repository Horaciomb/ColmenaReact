import React from "react";
import BreadcrumbExample from "./BreadcrumbExample";
import FormPagoPrimas from "./FormPagoPrimas"
export { PagoPrimas };
function PagoPrimas() {
  return (
    <div className="p-4">
      <div className="container ">
        <BreadcrumbExample></BreadcrumbExample>
        <h1>Pago de Primas</h1>
        <FormPagoPrimas></FormPagoPrimas>
      </div>
    </div>
  );
}
