import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaSalarioMinimo, AddEditSalarioMinimo } from "./";
export { GestionarSalarioMinimo };
function GestionarSalarioMinimo({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Salario Minimo",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaSalarioMinimo} />
          <Route path={`${path}/add`} component={AddEditSalarioMinimo} />
          <Route path={`${path}/edit/:id`} component={AddEditSalarioMinimo} />
        </Switch>
      </div>
    </div>
  );
}
