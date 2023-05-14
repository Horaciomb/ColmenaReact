import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaBancos, AddEditBancos } from "./";
export { GestionarBancos };
function GestionarBancos({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Bancos"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaBancos} />
          <Route path={`${path}/add`} component={AddEditBancos} />
          <Route path={`${path}/edit/:id`} component={AddEditBancos} />
        </Switch>
      </div>
    </div>
  );
}
