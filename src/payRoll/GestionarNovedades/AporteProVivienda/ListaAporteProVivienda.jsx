import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AporteProViviendasAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaAporteProVivienda };
function ListaAporteProVivienda({ match }) {
  const { path } = match;
  const aportes = useRecoilValue(AporteProViviendasAtom);
  const actions = useUserActions();
  useEffect(() => {
    actions.getAporteProViviendas();
    return actions.resetAporteProViviendas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function decimalToPercentage(decimal) {
    const percentage = decimal * 100;
    return `${percentage.toFixed(2)}%`;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <h1>Gestionar Porcentaje de Aporte Pro-Vivienda </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Porcentaje
      </Link>
      <div
        style={{
          maxheight: "450px",
          maxWidth: "700px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Porcentaje</th>
              <th style={{ width: "25%" }}>Fecha Inicial</th>
              <th style={{ width: "25%" }}>Fecha Final </th>
              <th style={{ width: "25%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {aportes?.map((aporte) => (
              <tr key={aporte.id}>
                <td>{decimalToPercentage(aporte.porcentaje)}</td>
                <td>{formatDate(aporte.fechaInicio)}</td>
                <td>{formatDate(aporte.fechaFin)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${aporte.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => actions.deleteAporteProVivienda(aporte.id)}
                    className="btn btn-sm btn-danger"
                    disabled={aporte.isDeleting}
                  >
                    {aporte.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!aportes && (
              <tr>
                <td colSpan="4" className="text-center">
                  <span className="spinner-border spinner-border-lg align-center"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
