import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  return (
    <Breadcrumb >
      <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
      <Breadcrumb.Item href="/payRoll">PayRoll</Breadcrumb.Item>
      <Breadcrumb.Item active>Boleta de Pago</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;