import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaDatosContacto, AddEditDatosContacto } from "./";
export { GestionarDatosContacto };
function GestionarDatosContacto({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Datos Contacto"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaDatosContacto} />
          <Route path={`${path}/add`} component={AddEditDatosContacto} />
          <Route path={`${path}/edit/:id`} component={AddEditDatosContacto} />
        </Switch>
      </div>
    </div>
  );
}
