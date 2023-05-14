import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaVacaciones, AddEditVacaciones } from "./";
export { GestionarVacaciones };
function GestionarVacaciones({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Vacaciones"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaVacaciones} />
          <Route path={`${path}/add`} component={AddEditVacaciones} />
          <Route path={`${path}/edit/:id`} component={AddEditVacaciones} />
        </Switch>
      </div>
    </div>
  );
}
