import React from "react";
import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListarSueldos, AddEditSueldo } from "./";
export { GestionarSueldos };
function GestionarSueldos({ match }) {
  const { path } = match;
  //const { id } = match.params;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "Gestión de Personal",
            "Asignar Cargos",
            "Gestionar Sueldo",
          ]}
          links={["/", "/gestionPersonal", "/asignarCargos", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={`${path}/:id`} component={ListarSueldos} />
          <Route path={`${path}/:ide/add/:idContrato`} component={AddEditSueldo} />
          <Route path={`${path}/:ide/edit/:idSueldo/:idContrato`} component={AddEditSueldo} />
        </Switch>
      </div>
    </div>
  );
}
