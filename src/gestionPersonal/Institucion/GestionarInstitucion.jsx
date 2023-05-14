import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaInstitucion, AddEditInstitucion } from "./";
export { GestionarInstitucion };
function GestionarInstitucion({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Institución"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaInstitucion} />
          <Route path={`${path}/add`} component={AddEditInstitucion} />
          <Route path={`${path}/edit/:id`} component={AddEditInstitucion} />
        </Switch>
      </div>
    </div>
  );
}
