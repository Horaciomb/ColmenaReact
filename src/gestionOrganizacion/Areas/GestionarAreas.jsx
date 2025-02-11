import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { AddEditAreas, ListaAreas } from ".";
export { GestionarAreas };
function GestionarAreas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container">
        <MenuNavegador
          titles={["Inicio", "Gestión de Organización", "Gestionar  Áreas"]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAreas} />
          <Route path={`${path}/add`} component={AddEditAreas} />
          <Route path={`${path}/edit/:id`} component={AddEditAreas} />
        </Switch>
      </div>
    </div>
  );
}
