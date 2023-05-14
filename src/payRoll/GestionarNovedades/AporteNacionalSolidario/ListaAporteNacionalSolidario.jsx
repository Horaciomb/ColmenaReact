import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AporteNacionalSolidariosAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaAporteNacionalSolidario };
function ListaAporteNacionalSolidario({ match }) {
  const { path } = match;
  const aportes = useRecoilValue(AporteNacionalSolidariosAtom);
  const actions = useUserActions();
  useEffect(() => {
    actions.getAporteNacionalSolidarios();
    return actions.resetAporteNacionalSolidarios();
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
      <h1>Gestionar Aporte Nacional Solidario </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Porcentaje
      </Link>
      <div
        style={{
          maxheight: "450px",
          maxWidth: "900px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Monto Mínimo</th>
              <th style={{ width: "20%" }}>Monto Máximo</th>
              <th style={{ width: "15%" }}>Porcentaje</th>
              <th style={{ width: "15%" }}>Fecha Inicial</th>
              <th style={{ width: "15%" }}>Fecha Final </th>
              <th style={{ width: "15%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {aportes?.map((aporte) => (
              <tr key={aporte.id}>
                <td>{aporte.totalCotizableMin}</td>
                <td>{aporte.totalCotizableMax}</td>
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
                    onClick={() => actions.deleteAporteNacionalSolidario(aporte.id)}
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
