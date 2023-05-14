import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaComisionAFP, AddEditComisionAFP } from "./";
export { GestionarComisionAdministrador };
function GestionarComisionAdministrador({match}) {
    const { path } = match;
    return (
      <div className="p-4">
        <div className="container ">
          <MenuNavegador
            titles={[
              "Inicio",
              "PayRoll",
              "Gestionar Novedades",
              "Comsión por Administración AFP",
            ]}
            links={["/", "/payRoll", "/gestionarNovedades", ""]}
          ></MenuNavegador>
          <Switch>
            <Route exact path={path} component={ListaComisionAFP} />
            <Route path={`${path}/add`} component={AddEditComisionAFP} />
            <Route path={`${path}/edit/:id`} component={AddEditComisionAFP} />
          </Switch>
        </div>
      </div>
    );
  }