import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaMontoUfv, AddEditMontoUfv } from "./";
export { GestionarMontoUfv };
function GestionarMontoUfv({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Monto UFVs",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaMontoUfv} />
          <Route path={`${path}/add`} component={AddEditMontoUfv} />
          <Route path={`${path}/edit/:id`} component={AddEditMontoUfv} />
        </Switch>
      </div>
    </div>
  );
}
