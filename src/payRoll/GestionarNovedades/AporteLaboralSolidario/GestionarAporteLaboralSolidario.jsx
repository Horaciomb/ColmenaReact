import React from "react";
import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAporteLaboralSolidario ,AddEditAporLaboralSolidario} from "./";
export { GestionarAporteLaboralSolidario };
function GestionarAporteLaboralSolidario({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Aporte Laboral Solidario",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAporteLaboralSolidario} />
          <Route path={`${path}/add`} component={AddEditAporLaboralSolidario} />
          <Route path={`${path}/edit/:id`} component={AddEditAporLaboralSolidario} />
        </Switch>

      </div>
    </div>
  );
}
