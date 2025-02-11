import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
import axios from "axios";
function FormBoletaPago() {
  const auth = useRecoilValue(authAtom);
  const token = auth?.token;
  const baseUrl = `${process.env.REACT_APP_API_URL}/BoletasdePagos/PDF`;
  const apiUrl = `${process.env.REACT_APP_API_URL}/Prima`;
  const [tipoPago, setTipoPago] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [primas, setPrimas] = useState([]);
  const [porcentaje, setPorcentaje] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [isLoading, setIsLoading] = useState(false);
  const [cuerpo, setCuerpo] = useState({
    empresaId: 1,
    empleados: [],
    tipoPago: "1",
    dobleAguinaldo: false,
    fecha: today.toISOString().substr(0, 10),
  });
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    setCuerpo({
      ...cuerpo,
      [name]: newValue,
    });
    console.log(cuerpo);
  };
  const actualizarTipoPago = (tipoPagoValue) => {
    switch (tipoPagoValue) {
      case "1":
        setTipoPago("Sueldo");
        break;
      case "2":
        setTipoPago("Aguinaldo");
        break;
      case "3":
        setTipoPago("Primas");
        break;
      default:
        setTipoPago("");
        break;
    }
  };
  function actualizarPeriodo(fecha) {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const anio = fechaObj.getFullYear();
    const periodo = `${meses[mes]}-${anio}`;
    setPeriodo(periodo);
  }

  const getPrimaByEmpresa = async (empresaId) => {
    const url = `${apiUrl}/empresa/${empresaId}`;
    const response = await axios.get(url);
    return response.data;
  };
  const decimalToPercentage = (decimalValue) => {
    const percentageValue = Math.round(decimalValue * 100);
    return `${percentageValue}%`;
  };
  useEffect(() => {
    actualizarTipoPago(cuerpo.tipoPago);
    actualizarPeriodo(cuerpo.fecha);
  }, [cuerpo]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Empleados`, {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
        },
      })
      .then((response) => {
        setEmpleados(response.data);
        setEmpleadosFiltrados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    actualizarEmpleadosSeleccionados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empleadosSeleccionados]);
  useEffect(() => {
    async function fetchPrima() {
      const empresaId = 1;
      const result = await getPrimaByEmpresa(empresaId);
      setPrimas(result);
    }
    fetchPrima();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const anoInt = new Date(cuerpo.fecha).getFullYear();
    const primaEncontrada = primas.find((prima) => prima.anio === anoInt);
    if (primaEncontrada) {
      const porcentaje = primaEncontrada.porcentaje;
      setPorcentaje(porcentaje);
    } else {
      setPorcentaje("no");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuerpo.fecha, primas]);

  function actualizarEmpleadosSeleccionados() {
    let idsEmpleadosSeleccionados = [];
    for (let i = 0; i < empleadosSeleccionados.length; i++) {
      idsEmpleadosSeleccionados.push(empleadosSeleccionados[i].id);
    }
    setCuerpo((prevState) => ({
      ...prevState,
      empleados: idsEmpleadosSeleccionados,
    }));
    console.log(cuerpo);
  }

  const seleccionarEmpleado = (empleado) => {
    if (!empleadosSeleccionados.includes(empleado)) {
      setEmpleadosSeleccionados([...empleadosSeleccionados, empleado]);
    }
  };
  const quitarEmpleado = (empleado) => {
    const nuevosEmpleadosSeleccionados = empleadosSeleccionados.filter(
      (e) => e.id !== empleado.id
    );
    setEmpleadosSeleccionados(nuevosEmpleadosSeleccionados);
  };
  function SeleccionarTodos(
    empleadosFiltrados,
    empleadosSeleccionados,
    setEmpleadosSeleccionados
  ) {
    const empleadosSeleccionadosActualizados =
      empleadosSeleccionados.concat(empleadosFiltrados);
    setEmpleadosSeleccionados(empleadosSeleccionadosActualizados);
  }
  function QuitarTodos() {
    setEmpleadosSeleccionados([]);
  }

  const filtrarEmpleados = (event) => {
    event.preventDefault();
    const textoBusqueda = busqueda.toLowerCase();
    if (!textoBusqueda) {
      // Si la búsqueda está vacía, no hay ningún filtro activo y se muestra la lista completa de empleados
      setEmpleadosFiltrados(empleados);

      return;
    }
    const empleadosFiltrados = empleados.filter((empleado) => {
      const nombreCompleto = `${empleado.persona.nombre} ${empleado.persona.apellidoPaterno} ${empleado.persona.apellidoMaterno}`;
      return nombreCompleto.toLowerCase().includes(textoBusqueda);
    });
    //setEmpleados(empleadosFiltrados);
    setEmpleadosFiltrados(empleadosFiltrados);
  };
  const postCuerpo = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (porcentaje === "no" && cuerpo.tipoPago === "3") {
      alert("No existe prima para el año seleccionado.");
      setIsLoading(false);
    } else {
      axios
        .post(baseUrl, cuerpo, {
          headers: {
            Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
          },
          method: "GET",
          ContentType: "blob",
          responseType: "arraybuffer", // important
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `Boleta de Pago ${tipoPago} Banca de Talentos S.R.L. ${periodo}.pdf`
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <div>
        <Row>
          <Col>
            <Row
              style={{
                height: "250px",
                maxWidth: "800px",
                marginRight: "10px",
              }}
            >
              <Form>
                <Row>
                  <Col className="my-1">
                    <Form.Group className="mb-3">
                      <Form.Label>Empresa</Form.Label>
                      <Form.Control
                        placeholder="Banca de Talentos S.R.L"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col className="my-1">
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo de Pago</Form.Label>
                      <Form.Select
                        className="custom-select mr-sm-2"
                        value={cuerpo.tipoPago}
                        onChange={handleChange}
                        name="tipoPago"
                      >
                        <option value="1">Sueldo</option>
                        <option value="2">Aguinaldo</option>
                        <option value="3">Primas</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicFechaFin">
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        value={cuerpo.fecha}
                        onChange={handleChange}
                        name="fecha"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {cuerpo.tipoPago === "2" && (
                  <Row>
                    <Col className="my-1">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Label>Doble Aguinaldo</Form.Label>
                        <Form.Check
                          type="checkbox"
                          label="Aplicar"
                          checked={cuerpo.dobleAguinaldo}
                          onChange={handleChange}
                          name="dobleAguinaldo"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
                {cuerpo.tipoPago === "3" && (
                  <Row>
                    <Col className="my-1" style={{ maxWidth: "250px" }}>
                      <Form.Group className="mb-3">
                        <Form.Label>Porcentaje de Prima</Form.Label>
                        <Form.Control
                          placeholder={decimalToPercentage(porcentaje)}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      onClick={postCuerpo}
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : "Imprimir"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
            <Row
              style={{
                height: "250px",
                maxWidth: "800px",
                overflow: "auto",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                marginRight: "10px",
              }}
            >
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th style={{ width: "100%" }}>Empleados seleccionados</th>
                    <th style={{ width: "100%" }}>
                      <Button
                        style={{
                          height: "auto",
                          maxHeight: "40px",
                          whiteSpace: "nowrap",
                        }}
                        variant="danger"
                        onClick={() => QuitarTodos()}
                      >
                        Quitar Todos
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {empleadosSeleccionados.map((empleado) => (
                    <tr key={empleado.id}>
                      <td>
                        {empleado.persona.nombre}{" "}
                        {empleado.persona.apellidoPaterno}{" "}
                        {empleado.persona.apellidoMaterno}{" "}
                      </td>
                      <td>
                        <Button
                          style={{ width: "100%" }}
                          variant="danger"
                          onClick={() => quitarEmpleado(empleado)}
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
          </Col>
          <Col
            style={{
              maxHeight: "500px",
              maxWidth: "700px",
              overflow: "auto",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <br />
            <Form onSubmit={filtrarEmpleados}>
              <Form.Group controlId="formBusqueda">
                <Row style={{ width: "100%" }}>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Buscar empleado por nombre o apellidos"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button variant="info" type="submit">
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <br />
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th style={{ width: "100%" }}>Nombre</th>
                  <th style={{ width: "100%" }}>
                    <Button
                      variant="info"
                      style={{
                        height: "auto",
                        maxHeight: "40px",
                        whiteSpace: "nowrap",
                      }}
                      onClick={() =>
                        SeleccionarTodos(
                          empleadosFiltrados,
                          empleadosSeleccionados,
                          setEmpleadosSeleccionados
                        )
                      }
                    >
                      Seleccionar Todos
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {empleadosFiltrados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>
                      {empleado.persona.nombre}{" "}
                      {empleado.persona.apellidoPaterno}{" "}
                      {empleado.persona.apellidoMaterno}{" "}
                    </td>
                    <td>
                      <Button
                        style={{ width: "100%" }}
                        variant="success"
                        onClick={() => seleccionarEmpleado(empleado)}
                      >
                        Seleccionar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FormBoletaPago;
