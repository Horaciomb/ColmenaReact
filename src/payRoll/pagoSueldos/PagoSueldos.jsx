import FormPagoSueldos from "./FormPagoSueldos";
import { MenuNavegador } from "../../_components/MenuNavegador";

export { PagoSueldos };
function PagoSueldos() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll", "Pago de Sueldos"]}
          links={["/", "/payRoll", ""]}
        />
        <h1>Pago de Sueldos</h1>
        <FormPagoSueldos></FormPagoSueldos>
      </div>
    </div>
  );
}
