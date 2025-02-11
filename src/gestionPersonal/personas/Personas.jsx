import React from "react";
import { Route, Switch } from "react-router-dom";
import { List } from "./List";
import { AddEdit } from "./AddEdit";
import { Ver } from "./Ver";
import { MenuNavegador } from "../../_components/MenuNavegador";
export { Personas };
function Personas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Personas"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={List} />
          <Route path={`${path}/add`} component={AddEdit} />
          <Route path={`${path}/edit/:id`} component={AddEdit} />
          <Route path={`${path}/ver/:id`} component={Ver} />
        </Switch>
      </div>
    </div>
  );
}
