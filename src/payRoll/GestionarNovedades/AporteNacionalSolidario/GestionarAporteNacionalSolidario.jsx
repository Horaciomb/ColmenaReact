import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaAporteNacionalSolidario ,AddEditAporteNacionalSolidario} from "./";
export  {GestionarAporteNacionalSolidario};
function GestionarAporteNacionalSolidario({match}) {
    const { path } = match;
    return (
      <div className="p-4">
        <div className="container ">
          <MenuNavegador
            titles={[
              "Inicio",
              "PayRoll",
              "Gestionar Novedades",
              "Aporte Nacional Solidario",
            ]}
            links={["/", "/payRoll", "/gestionarNovedades", ""]}
          ></MenuNavegador>
          <Switch>
            <Route exact path={path} component={ListaAporteNacionalSolidario} />
            <Route path={`${path}/add`} component={AddEditAporteNacionalSolidario} />
            <Route path={`${path}/edit/:id`} component={AddEditAporteNacionalSolidario} />
          </Switch>
        </div>
      </div>
    );
}
