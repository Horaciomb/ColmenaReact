import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { empleadosAtom } from "_state";
import { useUserActions } from "_actions";
import axios from "axios";
import { authAtom } from "_state";
export { FormPagoFiniquito };
function FormPagoFiniquito() {
  const auth = useRecoilValue(authAtom);
  const token = auth?.token;
  const baseUrl = `${process.env.REACT_APP_API_URL}/PagoFiniquito/PagoFiniquitoEmpleadoWord`;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    EmpleadoId: "1",
    Fecha: today.toISOString().substr(0, 10),
    Motivo: "0",
    MetodoPago: "0",
    DobleAguinaldo: false,
    otrosPagos: {
      glosa: "",
      monto: 0,
    },

    deducciones: [
      {
        glosa: "",
        monto: 0,
      },
    ],
  });
  const [otrosPagos, setOtrosPagos] = useState({
    glosa: "",
    monto: 0,
  });
  const [empleadoSeleccionada, setEmpleadoSeleccionada] = useState({
    id: "",
    nombre: "",
    persona: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const seleccionarEmpleado = (empleado) => {
    //const {name,value}=e.target;

    setEmpleadoSeleccionada(empleado);
    setCuerpo({
      ...cuerpo,
      EmpleadoId: empleado.id,
    });

    //console.log(seleccionarEmpleado);
    setShow(false);
  };
  const empleados = useRecoilValue(empleadosAtom);
  const userActions = useUserActions();
  useEffect(() => {
    console.log(empleadoSeleccionada);
  }, [empleadoSeleccionada]);

  useEffect(() => {
    userActions.getEmpleados();

    return userActions.resetEmpleados();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*
  const [deducciones, setDeducciones] = useState([
    {
      glosa: "",
      monto: 0,
    },
  ]);*/
  const handleDeduccionesChange = (e, index) => {
    const { name, value } = e.target;
    const newDeducciones = [...cuerpo.deducciones];
    newDeducciones[index] = {
      ...newDeducciones[index],
      [name]: value,
    };
    setCuerpo({
      ...cuerpo,
      deducciones: newDeducciones,
    });
    console.log(cuerpo);
  };

  const addDeduccion = () => {
    if (cuerpo.deducciones.length < 3) {
      const nuevaDeduccion = { glosa: "Nueva deducción", monto: 0 };
      setCuerpo({
        ...cuerpo,
        deducciones: [...cuerpo.deducciones, nuevaDeduccion],
      });
    }
  };

  const removeDeduccion = (index) => {
    const newDeducciones = [...cuerpo.deducciones];
    newDeducciones.splice(index, 1);
    setCuerpo({
      ...cuerpo,
      deducciones: newDeducciones,
    });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    setCuerpo({
      ...cuerpo,
      [name]: newValue,
    });
    console.log(cuerpo);
  };
  const handleOtrosPagosChange = (e) => {
    const { name, value } = e.target;
    setOtrosPagos({
      ...otrosPagos,
      [name]: value,
    });
    setCuerpo({
      ...cuerpo,
      otrosPagos: {
        ...cuerpo.otrosPagos,
        [name]: value,
      },
    });
    console.log(cuerpo);
  };
  const postCuerpo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(baseUrl, cuerpo, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
        },
        responseType: "arraybuffer", // Importante
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Finiquito ${empleadoSeleccionada.persona.nombre}  Banca de Talentos S.R.L .docx`
      );
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log("Error fetching data", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form onSubmit={postCuerpo}>
        <Row>
          <Col xs={12} md={6} className="my-1">
            <Form.Group className="mb-3">
              <Form.Label>Empresa seleccionada</Form.Label>
              <Form.Control placeholder="Banca de Talentos S.R.L" disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Empleado</Form.Label>
              <Row>
                <Col xs={8} sm={9}>
                  <Form.Control
                    disabled
                    value={`${empleadoSeleccionada.persona.nombre} ${empleadoSeleccionada.persona.apellidoPaterno}`}
                  />
                </Col>
                <Col xs={4} sm={3}>
                  <Button variant="info" onClick={handleShow}>
                    Buscar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="my-1">
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Fecha Último día Trabajo</Form.Label>
              <Form.Control
                type="date"
                value={cuerpo.Fecha}
                onChange={handleChange}
                name="Fecha"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="my-1">
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Select
                className="custom-select mr-sm-2"
                value={cuerpo.Motivo}
                onChange={handleChange}
                name="Motivo"
              >
                <option value="0">VOLUNTARIO</option>
                <option value="1">FORZOSO</option>
                <option value="2">CONCLUSIÓN DE CONTRATO</option>
                <option value="3">CONCLUSIÓN DE OBRA</option>
                <option value="4">INCUMPLIMIENTO DE CONTRATO</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="my-1">
            <Form.Group className="mb-3">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Select
                className="custom-select mr-sm-2"
                value={cuerpo.MetodoPago}
                onChange={handleChange}
                name="MetodoPago"
              >
                <option value="0">EFECTIVO</option>
                <option value="1">CHEQUE</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="my-1">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Doble Aguinaldo</Form.Label>
              <Form.Check
                type="checkbox"
                label="Aplicar"
                checked={cuerpo.DobleAguinaldo}
                onChange={handleChange}
                name="DobleAguinaldo"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="my-3">
            <Card>
              <Card.Header>Otros Pagos</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicOtrosPagos">
                  <Row>
                    <Col sm={10}>
                      <Form.Label>Glosa</Form.Label>
                      <Form.Control
                        type="text"
                        name="glosa"
                        value={cuerpo.otrosPagos.glosa}
                        onChange={handleOtrosPagosChange}
                      />
                      <Form.Label>Monto</Form.Label>
                      <Form.Control
                        type="number"
                        name="monto"
                        value={cuerpo.otrosPagos.monto}
                        onChange={handleOtrosPagosChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col className="my-3">
            <Card>
              <Card.Header>Deducciones</Card.Header>
              <Card.Body>
                {cuerpo.deducciones.map((deduccion, index) => (
                  <Form.Group className="mb-3" key={index}>
                    <Row>
                      <Col sm={10}>
                        <Form.Label>Glosa</Form.Label>
                        <Form.Control
                          type="text"
                          name="glosa"
                          value={deduccion.glosa}
                          onChange={(e) => handleDeduccionesChange(e, index)}
                        />
                        <Form.Label>Monto</Form.Label>
                        <Form.Control
                          type="number"
                          name="monto"
                          value={deduccion.monto}
                          onChange={(e) => handleDeduccionesChange(e, index)}
                        />
                      </Col>
                      <Col sm={3}>
                        <br />
                        {index > 0 && (
                          <Button
                            variant="outline-danger"
                            onClick={() => removeDeduccion(index)}
                          >
                            Borrar
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                ))}
                {cuerpo.deducciones.length <= 2 ? (
                  <Button variant="outline-info" onClick={addDeduccion} block>
                    Agregar deducción
                  </Button>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button type="submit" variant="success" disabled={isLoading} block>
              {isLoading ? "Cargando..." : "Imprimir"}
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title>Buscar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "70%" }}>Nombre</th>
                <th style={{ width: "30%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {empleados?.map((empleado) => (
                <tr key={empleado.id}>
                  <td>
                    {empleado.persona.nombre} {empleado.persona.apellidoPaterno}{" "}
                    {empleado.persona.apellidoMaterno}{" "}
                  </td>
                  <td>
                    <Button
                      onClick={() => seleccionarEmpleado(empleado)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!empleados && (
                <tr>
                  <td colSpan="2" className="text-center">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
