import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAsignacionGestora, AddEditAsignacionGestora } from "./";
export { GestionarAsignacionGestora };
function GestionarAsignacionGestora({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Asignar Gestora"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaAsignacionGestora} />
          <Route path={`${path}/add`} component={AddEditAsignacionGestora} />
          <Route
            path={`${path}/edit/:id`}
            component={AddEditAsignacionGestora}
          />
        </Switch>
      </div>
    </div>
  );
}
