import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAsignarCargos, AddAsignarCargos, EditAsignarCargos } from "./";
export { AsignarCargos };
function AsignarCargos({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Asignar Cargos"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAsignarCargos} />
          <Route path={`${path}/add`} component={AddAsignarCargos} />
          <Route path={`${path}/edit/:id`} component={EditAsignarCargos} />
        </Switch>
      </div>
    </div>
  );
}
