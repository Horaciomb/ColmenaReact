import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAporteProVivienda, AddEditAporteProVivienda } from "./";
export { GestionarAporteProVivienda };
function GestionarAporteProVivienda({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Aporte Pro-Vivienda",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAporteProVivienda} />
          <Route path={`${path}/add`} component={AddEditAporteProVivienda} />
          <Route path={`${path}/edit/:id`} component={AddEditAporteProVivienda} />
        </Switch>
      </div>
    </div>
  );
}
