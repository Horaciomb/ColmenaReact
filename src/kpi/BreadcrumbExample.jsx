import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
      <Breadcrumb.Item active>KPI</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;