import { MenuNavegador } from "../../../_components";
import { Route, Switch } from "react-router-dom";
import { ListaRiesgoProfesional, AddEditRiesgoProfesional } from "./";
export { GestionarRiesgoProfesional };
function GestionarRiesgoProfesional({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={[
            "Inicio",
            "PayRoll",
            "Gestionar Novedades",
            "Porcentaje Riesgo Profesional",
          ]}
          links={["/", "/payRoll", "/gestionarNovedades", ""]}
        ></MenuNavegador>
        <Switch>
          <Route exact path={path} component={ListaRiesgoProfesional} />
          <Route path={`${path}/add`} component={AddEditRiesgoProfesional} />
          <Route path={`${path}/edit/:id`} component={AddEditRiesgoProfesional} />
        </Switch>
      </div>
    </div>
  );
}
