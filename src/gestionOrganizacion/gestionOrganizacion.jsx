import { MenuNavegador } from "../_components";
  
import { LinkedItems } from "../_components";
export { gestionOrganizacion };
function gestionOrganizacion() {
  const titlesEmpresa = [
    "Gestionar Empresa",
    "Gestionar Datos Contacto Empresa",
    "Getionar Áreas",
    "Gestionar Cargos",
    "Gestionar Centro de Costos",
    "Reporte de Centro de Costos",
    "Generar Mapagrama",
  ];
  const linksEmpresa = [
    "/gestionarPerfilEmpresa",
    "/gestDatosContactoEmpresa",
    "/gestionarAreas",
    "/gestionarCargos",
    "/gestionarCentroCostos",
    "/reporteCentroCostos",
    "/generarMapagrama",
  ];
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Organización"]}
          links={["/", ""]}
        ></MenuNavegador>
        <h1>Gestión de Organización</h1>
        <div>
          <LinkedItems titles={titlesEmpresa} links={linksEmpresa} />
        </div>
      </div>
    </div>
  );
}
