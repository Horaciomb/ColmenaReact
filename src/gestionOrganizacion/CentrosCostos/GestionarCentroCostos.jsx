import React from 'react'
import { MenuNavegador } from "../../_components";
import { Route, Switch } from "react-router-dom";
import { AddEditCentroCosto, ListaCentroCosto } from ".";
export  {GestionarCentroCostos}
function GestionarCentroCostos({match}) {
    const { path } = match;
    return (
      <div className="p-4">
        <div className="container">
          <MenuNavegador
            titles={["Inicio", "Gestión de Organización", "Gestionar  Centro de Costos"]}
            links={["/", "/gestionOrganizacion", ""]}
          ></MenuNavegador>
          <Switch>
            <Route exact path={path} component={ListaCentroCosto} />
            <Route path={`${path}/add`} component={AddEditCentroCosto} />
            <Route path={`${path}/edit/:id`} component={AddEditCentroCosto} />
          </Switch>
        </div>
      </div>
    );
}

