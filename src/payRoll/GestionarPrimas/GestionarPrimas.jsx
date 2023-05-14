import { Route, Switch } from "react-router-dom";
import BreadcrumbExample from "./BreadcrumbExample";
import { AddEditPrimas, ListPrimas } from "./"
///import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
export { GestionarPrimas };
function GestionarPrimas({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <BreadcrumbExample></BreadcrumbExample>

        <Switch>
          <Route exact path={path} component={ListPrimas} />
          <Route path={`${path}/add`} component={AddEditPrimas} />
          <Route path={`${path}/edit/:id`} component={AddEditPrimas} />
        </Switch>
      </div>
    </div>
  );
}
