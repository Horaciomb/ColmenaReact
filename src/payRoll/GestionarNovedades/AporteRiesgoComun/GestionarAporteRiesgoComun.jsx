import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAporteRiesgoComun, AddEditAporteRiesgoComun } from "./";
export { GestionarAporteRiesgoComun };
function GestionarAporteRiesgoComun({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Aporte Riesgo Comun",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAporteRiesgoComun} />
          <Route path={`${path}/add`} component={AddEditAporteRiesgoComun} />
          <Route
            path={`${path}/edit/:id`}
            component={AddEditAporteRiesgoComun}
          />
        </Switch>
      </div>
    </div>
  );
}
