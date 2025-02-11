import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, { CARGO_VARIABLES } from "../../grafql/graphql";
import { CargoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import TablaModal from "_components/TablaModal";
export { AddEditCargos }; 
function AddEditCargos({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const cargo = useRecoilValue(CargoAtom);
  const [datosConsulta, setDatosConsulta] = useState({
    areas: [],
    tipoCargos: [],
    responsabilidadMapagramas: [],
    categoriaSueldos: [],
    ciudades: [],
  });
  const [dataConsulta, setDataConsulta] = useState({
    areas: [],
    tipoCargos: [],
    responsabilidadMapagramas: [],
    categoriaSueldos: [],
    ciudades: [],
  });
  // Estados para manejar los modales
  const [modalAreas, setModalAreas] = useState(false);
  const [modalTipoCargos, setModalTipoCargos] = useState(false);
  const [modalResponsabilidadMapagramas, setModalResponsabilidadMapagramas] =
    useState(false);
  const [modalCategoriaSueldos, setModalCategoriaSueldos] = useState(false);
  const [modalCiudades, setModalCiudades] = useState(false);
  // Estados para los elementos seleccionados
  const [areaSeleccionada, setAreaSeleccionada] = useState({
    id: "",
    nombre: "",
  });
  const columnsArea = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ];

  const [tipoCargoSeleccionado, setTipoCargoSeleccionado] = useState({
    id: "",
    nombre: "",
  });

  const [
    responsabilidadMapagramaSeleccionada,
    setResponsabilidadMapagramaSeleccionada,
  ] = useState({
    id: "",
    nombre: "",
  });

  const [categoriaSueldoSeleccionada, setCategoriaSueldoSeleccionada] =
    useState({
      id: "",
      nombre: "",
    });
  const columnsCategoriaSueldos = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ];
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState({
    id: "",
    nombre: "",
    divisionPolitica: {
      id: "",
      nombre: "",
      pais: {
        id: "",
        nombre: "",
      },
    },
  });
  const columnsCiudades = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "División Política",
      accessorKey: "divisionPolitica",
    },
    {
      header: "País",
      accessorKey: "pais",
    },
    // Agrega más columnas según sea necesario
  ];

  // Seleccionar
  const seleccionarArea = (area) => {
    setAreaSeleccionada(area);
    setModalAreas(false);
  };
  const seleccionarTipoCargo = (tipoCargo) => {
    setTipoCargoSeleccionado(tipoCargo);
    setModalTipoCargos(false);
  };
  const seleccionarResponsabilidad = (responsabilidad) => {
    setResponsabilidadMapagramaSeleccionada(responsabilidad);
    setModalResponsabilidadMapagramas(false);
  };
  const seleccionarCategoriaSueldos = (categoriaSueldos) => {
    setCategoriaSueldoSeleccionada(categoriaSueldos);
    setModalCategoriaSueldos(false);
  };
  const seleccionarCiudad = (ciudad) => {
    setCiudadSeleccionada(ciudad);
    setModalCiudades(false);
  };
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      divisionPolitica: item.divisionPolitica.nombre,
      pais: item.divisionPolitica.pais.nombre,
    }));
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.query({
          query: CARGO_VARIABLES,
        });

        // Actualizar los estados con los datos de la consulta
        setDatosConsulta({
          areas: result.data.areas,
          tipoCargos: result.data.tipoCargos,
          responsabilidadMapagramas: result.data.responsabilidadMapagramas,
          categoriaSueldos: result.data.categoriaSueldos,
          ciudades: result.data.ciudades,
        });
        setDataConsulta({
          areas: result.data.areas,
          tipoCargos: result.data.tipoCargos,
          responsabilidadMapagramas: result.data.responsabilidadMapagramas,
          categoriaSueldos: result.data.categoriaSueldos,
          ciudades: transformarDatos(result.data.ciudades),
        });
        console.log(result.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    objetivo: Yup.string().required("Objetivo es requerido"),
    areaId: Yup.string().required("Área es requerido"),
    categoriaSueldoId: Yup.string().required(
      "Categoría de Sueldo es requerido"
    ),
    responsabilidadId: Yup.string().required("Responsabilidad es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getCargoById(id);
    }
    return userActions.resetCargo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && cargo) {
      reset(cargo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargo]);
  useEffect(() => {
    if (mode.edit && cargo) {
      if (cargo.area) {
        const area = cargo.area;
        setAreaSeleccionada({
          id: area.id,
          nombre: area.nombre,
        });
      }
      if (cargo.tipoCargo) {
        const tipoCargo = cargo.tipoCargo;
        setTipoCargoSeleccionado({
          id: tipoCargo.id,
          nombre: tipoCargo.nombre,
        });
      }
      if (cargo.responsabilidad) {
        const responsabilidad = cargo.responsabilidad;
        setResponsabilidadMapagramaSeleccionada({
          id: responsabilidad.id,
          nombre: responsabilidad.nombre,
        });
      }
      if (cargo.categoriaSueldo) {
        const categoriaSueldo = cargo.categoriaSueldo;
        setCategoriaSueldoSeleccionada({
          id: categoriaSueldo.id,
          nombre: categoriaSueldo.nombre,
        });
      }
      if (cargo.ciudad) {
        const ciudad = cargo.ciudad;
        setCiudadSeleccionada({
          id: ciudad.id,
          nombre: ciudad.nombre,
          divisionPolitica: {
            id: ciudad.divisionPolitica.id,
            nombre: ciudad.divisionPolitica.nombre,
            pais: {
              id: ciudad.divisionPolitica.pais.id,
              nombre: ciudad.divisionPolitica.pais.nombre,
            },
          },
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, cargo]);

  function onSubmit(data) {
    return mode.add ? createCargo(data) : updateCargo(cargo.id, data);
  }
  async function createCargo(data) {
    //data.empresaId = 1;
    console.log(data);

    try {
      await userActions.registrarCargo(data);
      history.push("/gestionarCargos");
      alertActions.success("Cargo añadida");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear el Cargo");
    }
  }

  async function updateCargo(id, data) {
    await userActions.updateCargo(id, data);
    history.push("/gestionarCargos");
    alertActions.success("Cargo actualizada");
  }
  const handleLimpiar = () => {
    reset(cargo);
    setAreaSeleccionada({ id: "", nombre: "" });
    setTipoCargoSeleccionado({ id: "", nombre: "" });
    setResponsabilidadMapagramaSeleccionada({ id: "", nombre: "" });
    setCategoriaSueldoSeleccionada({ id: "", nombre: "" });
    setCiudadSeleccionada({
      id: "",
      nombre: "",
      divisionPolitica: {
        id: "",
        nombre: "",
        pais: {
          id: "",
          nombre: "",
        },
      },
    });
  };

  const loading = mode.edit && !cargo;
  const areaId = areaSeleccionada?.id || "";
  const responsabilidadId = responsabilidadMapagramaSeleccionada?.id || "";
  const categoriaSueldoId = categoriaSueldoSeleccionada?.id || "";
  const tipoCargoId = tipoCargoSeleccionado?.id || "";
  const ciudadId = ciudadSeleccionada?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Cargo" : "Editar Cargo"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  {...register("nombre")}
                  className={`form-control ${
                    errors.nombre ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.nombre?.message}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Objetivo</Form.Label>
                <Form.Control
                  name="objetivo"
                  type="text"
                  {...register("objetivo")}
                  className={`form-control ${
                    errors.objetivo ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.objetivo?.message}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Área</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="areaId"
                      type="text"
                      value={`${areaSeleccionada?.nombre}`}
                      {...register("areaId", {
                        value: areaId,
                      })}
                      className={`form-control ${
                        errors.areaId && areaSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.areaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={() => setModalAreas(true)}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Responsabilidad Mapagrama</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="responsabilidadId"
                      type="text"
                      value={`${responsabilidadMapagramaSeleccionada?.nombre}`}
                      {...register("responsabilidadId", {
                        value: responsabilidadId,
                      })}
                      className={`form-control ${
                        errors.responsabilidadId &&
                        responsabilidadMapagramaSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.responsabilidadId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button
                      variant="info"
                      onClick={() => setModalResponsabilidadMapagramas(true)}
                    >
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Categoría de Sueldo</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="categoriaSueldoId"
                      type="text"
                      value={`${categoriaSueldoSeleccionada?.nombre}`}
                      {...register("categoriaSueldoId", {
                        value: categoriaSueldoId,
                      })}
                      className={`form-control ${
                        errors.categoriaSueldoId &&
                        categoriaSueldoSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.categoriaSueldoId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button
                      variant="info"
                      onClick={() => setModalCategoriaSueldos(true)}
                    >
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Ciudades</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="ciudadId"
                      type="text"
                      value={`${ciudadSeleccionada?.nombre}`}
                      {...register("ciudadId", {
                        value: ciudadId,
                      })}
                      className={`form-control ${
                        errors.ciudadId && ciudadSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.ciudadId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button
                      variant="info"
                      onClick={() => setModalCiudades(true)}
                    >
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Área</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="areaId"
                      type="text"
                      value={`${areaSeleccionada?.nombre}`}
                      {...register("areaId", {
                        value: areaId,
                      })}
                      className={`form-control ${
                        errors.areaId && areaSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.areaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={() => setModalAreas(true)}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row> */}
          <div className="form-group">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="btn btn-primary mr-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Guardar
            </button>
            <button
              onClick={handleLimpiar}
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Resetear
            </button>
            <Link to="/gestionarCargos" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </Form>
      )}
      {loading && (
        <div className="text-center p-3">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
      )}
      <Modal show={modalAreas} onHide={() => setModalAreas(false)}>
        <Modal.Header>
          <Modal.Title>Buscar Área</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal
            data={dataConsulta.areas}
            columns={columnsArea}
            datos={datosConsulta.areas}
            handleClick={seleccionarArea}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setModalAreas(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalResponsabilidadMapagramas}
        onHide={() => setModalResponsabilidadMapagramas(false)}
      >
        <Modal.Header>
          <Modal.Title>Buscar Responsabilidad Mapagrama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal
            data={dataConsulta.responsabilidadMapagramas}
            columns={columnsArea}
            datos={datosConsulta.responsabilidadMapagramas}
            handleClick={seleccionarResponsabilidad}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setModalResponsabilidadMapagramas(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalCategoriaSueldos}
        onHide={() => setModalCategoriaSueldos(false)}
      >
        <Modal.Header>
          <Modal.Title>Buscar Categoría de Sueldos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal
            data={dataConsulta.categoriaSueldos}
            columns={columnsCategoriaSueldos}
            datos={datosConsulta.categoriaSueldos}
            handleClick={seleccionarCategoriaSueldos}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setModalCategoriaSueldos(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalCiudades} onHide={() => setModalCiudades(false)}>
        <Modal.Header>
          <Modal.Title>Buscar Ciudad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal
            data={dataConsulta.ciudades}
            columns={columnsCiudades}
            datos={datosConsulta.ciudades}
            handleClick={seleccionarCiudad}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setModalCiudades(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
