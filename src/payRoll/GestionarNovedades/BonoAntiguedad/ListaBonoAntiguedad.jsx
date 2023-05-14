import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BonoAntigedadPorcentajesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaBonoAntiguedad };
function ListaBonoAntiguedad({ match }) {
  const { path } = match;
  const bonos = useRecoilValue(BonoAntigedadPorcentajesAtom);
  const actions = useUserActions();
  useEffect(() => {
    actions.getBonoAntiguedades();
    return actions.resetBonoAntiguedades();
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
      <h1>Gestionar Porcentaje de Bono de Antigüedad </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Porcentaje
      </Link>
      <div
        style={{
          maxheight: "450px",
 
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Año de Antigüedad</th>
              <th style={{ width: "20%" }}>Porcentaje</th>
              <th style={{ width: "20%" }}>Fecha Inicial</th>
              <th style={{ width: "20%" }}>Fecha Final </th>
              <th style={{ width: "20%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {bonos?.map((bono) => (
              <tr key={bono.id}>
                <td>{bono.aniosDeAntiguedad}</td>
                <td>{decimalToPercentage(bono.porcentaje)}</td>
                <td>{formatDate(bono.fechaInicio)}</td>
                <td>{formatDate(bono.fechaFin)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${bono.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => actions.deleteBonoAntiguedad(bono.id)}
                    className="btn btn-sm btn-danger"
                    disabled={bono.isDeleting}
                  >
                    {bono.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!bonos && (
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
