import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaRciva, AddEditRciva } from "./";
export { GestionarRcivas };
function GestionarRcivas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar RC-IVA"]}
          links={["/", "/gestionPersonal",""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaRciva} />
          <Route path={`${path}/add`} component={AddEditRciva} />
          <Route path={`${path}/edit/:id`} component={AddEditRciva} />
        </Switch>
      </div>
    </div>
  );
}
