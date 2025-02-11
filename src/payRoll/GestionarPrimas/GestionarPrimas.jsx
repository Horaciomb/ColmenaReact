import { Route, Switch } from "react-router-dom";
import { MenuNavegador } from "../../_components/MenuNavegador";

import { AddEditPrimas, ListPrimas } from "./"
///import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
export { GestionarPrimas };
function GestionarPrimas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
      <MenuNavegador
          titles={["Inicio", "PayRoll", "Gestionar Primas"]}
          links={["/", "/payRoll", ""]}
        />

        <Switch>
          <Route exact path={path} component={ListPrimas} />
          <Route path={`${path}/add`} component={AddEditPrimas} />
          <Route path={`${path}/edit/:id`} component={AddEditPrimas} />
        </Switch>
      </div>
    </div>
  );
}
