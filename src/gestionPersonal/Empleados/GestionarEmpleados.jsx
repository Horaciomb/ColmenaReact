import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaEmpleados, AddEditEmpleado } from "./";
export { GestionarEmpleados };
function GestionarEmpleados({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Empleado"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaEmpleados} />
          <Route path={`${path}/add`} component={AddEditEmpleado} />
          <Route path={`${path}/edit/:id`} component={AddEditEmpleado} />
        </Switch>
      </div>
    </div>
  );
}
