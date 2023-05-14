import React from "react";
//import BreadcrumbExample from "./BreadcrumbExample";
import {MenuNavegador} from "../../_components";
import ListaNovedades from "./ListaNovedades";
export { GestionarNovedades };
function GestionarNovedades() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll", "Gestionar Novedades"]}
          links={["/", "/payRoll", ""]}
        ></MenuNavegador>
        <h1>Gestionar Novedades</h1>
        <ListaNovedades></ListaNovedades>
      </div>
    </div>
  );
}
