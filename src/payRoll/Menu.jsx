
import LeftTabsExample from "./LeftTabsExample";
import { MenuNavegador } from "_components";
export { Menu };
function Menu() {
  return (
    <div className="p-4">
      <div className="container ">
        <MenuNavegador
          titles={["Inicio", "PayRoll"]}
          links={["/", ""]}
        />
        <h1>PayRoll</h1>
        <LeftTabsExample></LeftTabsExample>
      </div>
    </div>
  );
}
