import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListObtenerCargos,VerCargos } from "./";
export { ObtenerCargos };
function ObtenerCargos({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Obtener Cargos"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListObtenerCargos} />
          <Route path={`${path}/ver/:id`} component={VerCargos} />
        </Switch>
      </div>
    </div>
  );
}
