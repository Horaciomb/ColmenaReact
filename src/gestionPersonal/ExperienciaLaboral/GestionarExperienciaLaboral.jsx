import React from "react";
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaExperienciLaboral, AddEditExperienciLaboral } from "./";
export { GestionarExperienciaLaboral };
function GestionarExperienciaLaboral({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal", "Gestionar Experiencia Laboral"]}
          links={["/", "/gestionPersonal", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaExperienciLaboral} />
          <Route path={`${path}/add`} component={AddEditExperienciLaboral} />
          <Route path={`${path}/edit/:id`} component={AddEditExperienciLaboral} />
        </Switch>
      </div>
    </div>
  );
}
