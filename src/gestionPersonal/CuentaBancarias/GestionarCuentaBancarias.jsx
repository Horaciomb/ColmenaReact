import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaCuentaBancaria, AddEditCuentaBancaria } from "./";
export { GestionarCuentaBancarias };
function GestionarCuentaBancarias({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Asignar Cuenta Bancaria"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaCuentaBancaria} />
          <Route path={`${path}/add`} component={AddEditCuentaBancaria} />
          <Route path={`${path}/edit/:id`} component={AddEditCuentaBancaria} />
        </Switch>
      </div>
    </div>
  );
}
