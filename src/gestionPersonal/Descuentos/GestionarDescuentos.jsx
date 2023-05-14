import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaDescuento, AddEditDescuento } from "./";
export { GestionarDescuentos };
function GestionarDescuentos({match}) {
    const { path } = match;
    return (
      <div className="p-4">
        <div className="container ">
          <MenuNavegador
            titles={["Inicio", "Gestión de Personal", "Gestionar Descuentos"]}
            links={["/", "/gestionPersonal", ""]}
          ></MenuNavegador>
          <Switch>
            <Route exact path={path} component={ListaDescuento} />
            <Route path={`${path}/add`} component={AddEditDescuento} />
            <Route path={`${path}/edit/:id`} component={AddEditDescuento} />
          </Switch>
        </div>
      </div>
    );
  }
  