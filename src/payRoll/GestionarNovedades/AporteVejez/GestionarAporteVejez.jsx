import React from "react";
import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAporteVejez ,AddEditAporteVejez} from "./";
export { GestionarAporteVejez };
function GestionarAporteVejez({match}) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Aporte de Vejez",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAporteVejez} />
          <Route path={`${path}/add`} component={AddEditAporteVejez} />
          <Route path={`${path}/edit/:id`} component={AddEditAporteVejez} />
        </Switch>

      </div>
    </div>
  );
}
