import { MenuNavegador } from "../_components";
import LeftTabsExample from "./LeftTabsExample";
export { Menu };
function Menu() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "Gestión de Personal"]}
          links={["/", ""]}
        ></MenuNavegador>
        <h1>Gestión de Personal</h1>
        <LeftTabsExample></LeftTabsExample>
      </div>
    </div>
  );
}
