import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import {ListaTipoAras,AddEditTiposAreas} from "./"
export { GestionarTiposAreas };
function GestionarTiposAreas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container">
        <MenuNavegador
          titles={["Inicio", "Gestión de Organización", "Gestionar Tipo de Áreas"]}
          links={["/", "/gestionOrganizacion", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaTipoAras} />
          <Route path={`${path}/add`} component={AddEditTiposAreas} />
          <Route path={`${path}/edit/:id`} component={AddEditTiposAreas} />
        </Switch>
      </div>
    </div>
  );
}
