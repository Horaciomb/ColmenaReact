import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAsignacionAfp, AddEditAsignacionAfp } from "./";
export { GestionarAsignacionAfp };
function GestionarAsignacionAfp({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Asignar AFP"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAsignacionAfp} />
          <Route path={`${path}/add`} component={AddEditAsignacionAfp} />
          <Route path={`${path}/edit/:id`} component={AddEditAsignacionAfp} />
        </Switch>
      </div>
    </div>
  );
}
