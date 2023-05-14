import React from 'react';
import BreadcrumbExample from "./BreadcrumbExample";
import FormPagoAguinaldo from './FormPagoAguinaldo'

export { PagoAguinaldo };
function PagoAguinaldo() {
  return (
    <div className="p-4">
      <div className="container ">
        <BreadcrumbExample></BreadcrumbExample>
        <h1>Pago de Aguinaldos</h1>
        <FormPagoAguinaldo></FormPagoAguinaldo>
      </div>
    </div>
  );
}
