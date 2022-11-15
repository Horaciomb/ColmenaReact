import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  return (
    <Breadcrumb >
      <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
      <Breadcrumb.Item href="/gestionPersonal">Gestión de Personal</Breadcrumb.Item>
      <Breadcrumb.Item active>Gestionar Personas</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;