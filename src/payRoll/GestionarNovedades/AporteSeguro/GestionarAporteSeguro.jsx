import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAporteSeguro, AddEditAporSeguro } from "./";
export { GestionarAporteSeguro };
function GestionarAporteSeguro({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Aporte Seguro a Corto Plazo",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAporteSeguro} />
          <Route path={`${path}/add`} component={AddEditAporSeguro} />
          <Route path={`${path}/edit/:id`} component={AddEditAporSeguro} />
        </Switch>
      </div>
    </div>
  );
}
