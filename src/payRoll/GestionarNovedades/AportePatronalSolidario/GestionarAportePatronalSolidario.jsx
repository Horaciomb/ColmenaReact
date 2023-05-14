import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import {
  ListaAportePatronalSolidario,
  AddEditAportePatronalSolidario,
} from "./";
export { GestionarAportePatronalSolidario };
function GestionarAportePatronalSolidario({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Aporte Patronal Solidario",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAportePatronalSolidario} />
          <Route path={`${path}/add`} component={AddEditAportePatronalSolidario} />
          <Route path={`${path}/edit/:id`} component={AddEditAportePatronalSolidario} />
        </Switch>
      </div>
    </div>
  );
}
