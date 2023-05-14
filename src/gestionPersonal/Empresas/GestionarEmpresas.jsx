import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaREmpresas, AddEditEmpresas } from "./";
export { GestionarEmpresas };
function GestionarEmpresas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Empresas"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaREmpresas} />
          <Route path={`${path}/add`} component={AddEditEmpresas} />
          <Route path={`${path}/edit/:id`} component={AddEditEmpresas} />
        </Switch>
      </div>
    </div>
  );
}
