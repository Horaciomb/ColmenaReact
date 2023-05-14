import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaIngreso, AddEditIngreso } from "./";
export { GestionarIngresos };
function GestionarIngresos({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Ingresos"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaIngreso} />
          <Route path={`${path}/add`} component={AddEditIngreso} />
          <Route path={`${path}/edit/:id`} component={AddEditIngreso} />
        </Switch>
      </div>
    </div>
  );
}
