import { MenuNavegador } from "../../_components";
import { FormIncrementoSalarial} from "./"
export  {PorcesarIncrementoSalarial}
function PorcesarIncrementoSalarial() {
    return (
        <div className="p-4">
          <div className="container ">
            <MenuNavegador
              titles={[
                "Inicio",
                "PayRoll",
                "Incremento Salarial",
              ]}
              links={["/", "/payRoll", ""]}
            ></MenuNavegador>
            <h1>Procesar Incremento Salarial</h1>
            <FormIncrementoSalarial></FormIncrementoSalarial>
          </div>
        </div>
      );
  }

