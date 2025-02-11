import FormKPI from "./FormKPI";
import { MenuNavegador } from "_components";
export { KPI };
function KPI() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador titles={["Inicio", "KPI"]} links={["/", ""]} />
        <h1>KPI</h1>
        <FormKPI></FormKPI>
      </div>
    </div>
  );
}
