import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import {ListaCargos,AddEditCargos} from ".";
export { GestionarCargos };
function GestionarCargos({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container">
        <MenuNavegador
          titles={["Inicio", "Gestión de Organización", "Gestionar  Cargos"]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaCargos} />
          <Route path={`${path}/add`} component={AddEditCargos} />
          <Route path={`${path}/edit/:id`} component={AddEditCargos} />
        </Switch>
      </div>
    </div>
  );
}
