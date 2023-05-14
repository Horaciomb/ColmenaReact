import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaBonoAntiguedad, AddEditBonoantiguedad } from "./";

export { GestionarBonoAntiguedad };
function GestionarBonoAntiguedad({match}) {
    const { path } = match;
    return (
      <div className="p-4">
        <div className="container ">
          <MenuNavegador
            titles={[
              "Inicio",
              "PayRoll",
              "Gestionar Novedades",
              "Bono Antigüedad",
            ]}
            links={["/", "/payRoll", "/gestionarNovedades", ""]}
          ></MenuNavegador>
          <Switch>
            <Route exact path={path} component={ListaBonoAntiguedad} />
            <Route path={`${path}/add`} component={AddEditBonoantiguedad} />
            <Route path={`${path}/edit/:id`} component={AddEditBonoantiguedad} />
          </Switch>
        </div>
      </div>
    );
  }
  
