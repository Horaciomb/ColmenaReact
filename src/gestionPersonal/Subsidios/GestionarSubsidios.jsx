import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaSubsidios, AddEditSubsidios } from "./";
export { GestionarSubsidios };
function GestionarSubsidios({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Asignar Subsidios"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaSubsidios} />
          <Route path={`${path}/add`} component={AddEditSubsidios} />
          <Route path={`${path}/edit/:id`} component={AddEditSubsidios} />
        </Switch>
      </div>
    </div>
  );
}
