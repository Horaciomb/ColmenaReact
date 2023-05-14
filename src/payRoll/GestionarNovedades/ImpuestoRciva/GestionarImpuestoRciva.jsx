import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaImpuestoRciva, AddEditImpuestoRciva } from "./";
export  { GestionarImpuestoRciva };
function GestionarImpuestoRciva({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Impuesto Laboral RC-IVA",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaImpuestoRciva} />
          <Route path={`${path}/add`} component={AddEditImpuestoRciva} />
          <Route path={`${path}/edit/:id`} component={AddEditImpuestoRciva} />
        </Switch>
      </div>
    </div>
  );
}
