import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaFormacion, AddEditFormacion } from "./";
export { GestionarFormaciones };
function GestionarFormaciones({match}) {
    const { path } = match;
    return (
      <div className="p-4">
        <div className="container ">
          <MenuNavegador
            titles={["Inicio", "Gestión de Personal", "Gestionar Formación"]}
            links={["/", "/gestionPersonal", ""]}
          ></MenuNavegador>
          <Switch>
            <Route exact path={path} component={ListaFormacion} />
            <Route path={`${path}/add`} component={AddEditFormacion} />
            <Route path={`${path}/edit/:id`} component={AddEditFormacion} />
          </Switch>
        </div>
      </div>
    );
  }
