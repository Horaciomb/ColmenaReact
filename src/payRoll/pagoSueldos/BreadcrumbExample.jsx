import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  return (
    <Breadcrumb >
      <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
      <Breadcrumb.Item href="/payRoll">PayRoll</Breadcrumb.Item>
      <Breadcrumb.Item active>Pago de Sueldos</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;