import { Button, Form, Row, Col, Collapse } from "react-bootstrap";
import DocuPDF2 from "./DocuPDF2.jsx";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

function FormKPI() {
  const auth = useRecoilValue(authAtom);
  const token = auth?.token;
  const baseUrl = `${process.env.REACT_APP_API_URL}/Kpis`;
  const [open, setOpen] = useState(false);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [isLoading, setIsLoading] = useState(false);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    mes: today.getMonth().toString(),
    ano: today.getFullYear().toString(),
  });

  const inicioDonut = {
    datasets: [
      {
        label: "Total",
        data: [0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const inicioBarHorizontal = {
    datasets: [
      {
        label: "Dataset 1",
        data: [0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      datalabels: {
        backgroundColor: function (context) {
          return context.dataset.backgroundColor;
        },
      },
    },
  };
  const optionsBar = {
    indexAxis: "y",
    scales: {
      y: { beginAtZero: true },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  // Graficos
  const [dataDonutGenero, setDataDonutGenero] = useState(inicioDonut);
  const [dataDonutRegional, setDataDonutRegional] = useState(inicioDonut);
  const [promedioAntiguedad, setPromedioAntiguedad] = useState(0);
  const [promedioEdad, setPromedioEdad] = useState(0);
  const [dataBarAntGenero, setDataBarAntGenero] = useState(inicioBarHorizontal);
  const [dataBarEdadGenero, setDataBarEdadGenero] =
    useState(inicioBarHorizontal);
  const [dataPieArea, setDataPieArea] = useState(inicioDonut);
  const [dataPieCargos, setDataPieCargos] = useState(inicioDonut);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuerpo({
      ...cuerpo,
      [name]: value,
    });
    console.log(cuerpo);
  };
  const postCuerpo = (e) => {
    e.preventDefault();
    //console.log(cuerpo);
    setIsLoading(true);
    axios
      .post(baseUrl, cuerpo, {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
        },
      })
      .then((res) => {
        //console.log(res.data.distribucionRegional)
        // Distribución Departamental Bolivia
        const labelsDistribucionRegional = res.data.distribucionRegional.map(
          (item) => item.nombre
        );
        const valuesDistribucionRegional = res.data.distribucionRegional.map(
          (item) => item.cantidad
        );
        const contenidoDonutRegional = {
          labels: labelsDistribucionRegional,
          datasets: [
            {
              label: "Total",
              data: valuesDistribucionRegional,
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        };
        setDataDonutRegional(contenidoDonutRegional);
        // Distribución de Género
        const labelsDistribucionGenero = res.data.distribucionGenero.map(
          (item) => item.nombre
        );
        const valuesDistribucionGenero = res.data.distribucionGenero.map(
          (item) => item.cantidad
        );
        const contenidoDonutGenero = {
          labels: labelsDistribucionGenero,
          datasets: [
            {
              label: "Total",
              data: valuesDistribucionGenero,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        };
        setDataDonutGenero(contenidoDonutGenero);
        // Promedio Antiguedad
        setPromedioAntiguedad(res.data.promedioAntiguedad);
        // Promedio Edad
        setPromedioEdad(res.data.promedioEdad);
        // Bar Antiguedad Genero
        const menos3MesesHombres =
          res.data.distribucionGeneroAntiguedad.menos3Meses.distMasculino;
        const menos3MesesMujeres =
          res.data.distribucionGeneroAntiguedad.menos3Meses.distFemenino;
        const de3Meses1AnoHombres =
          res.data.distribucionGeneroAntiguedad.de3Meses1Ano.distMasculino;
        const de3Meses1AnoMujeres =
          res.data.distribucionGeneroAntiguedad.de3Meses1Ano.distFemenino;
        const de1Ano2AnoHombres =
          res.data.distribucionGeneroAntiguedad.de1Ano2Ano.distMasculino;
        const de1Ano2AnoMujeres =
          res.data.distribucionGeneroAntiguedad.de1Ano2Ano.distFemenino;
        const de2Ano5AnoHombres =
          res.data.distribucionGeneroAntiguedad.de2Ano5Ano.distMasculino;
        const de2Ano5AnoMujeres =
          res.data.distribucionGeneroAntiguedad.de2Ano5Ano.distFemenino;
        const mas5AnosHombres =
          res.data.distribucionGeneroAntiguedad.mas5Anos.distMasculino;
        const mas5AnosMujeres =
          res.data.distribucionGeneroAntiguedad.mas5Anos.distFemenino;
        const contenidoBarAntiguedadGenero = {
          labels: [
            "Menor a 3 meses",
            "De 3 meses a 1 año",
            "De 1 año a 2 años",
            "De 2 años a 5 años",
            "Mayor a 5 años",
          ],
          datasets: [
            {
              label: "Hombres",
              data: [
                menos3MesesHombres,
                de3Meses1AnoHombres,
                de1Ano2AnoHombres,
                de2Ano5AnoHombres,
                mas5AnosHombres,
              ],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "Mujeres",
              data: [
                menos3MesesMujeres,
                de3Meses1AnoMujeres,
                de1Ano2AnoMujeres,
                de2Ano5AnoMujeres,
                mas5AnosMujeres,
              ],

              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };
        setDataBarAntGenero(contenidoBarAntiguedadGenero);
        // Bar Edad Genero
        const labelsDistribucionEdad = res.data.distGeneroEdad.map(
          (item) => item.edad
        );
        const valuesDistEdadGeneroHombres =
          res.data.distGeneroEdadMasculino.map((item) => item.cantidad);
        const valuesDistEdadGeneroMujeres = res.data.distGeneroEdadFemenino.map(
          (item) => item.cantidad
        );
        const contenidoBarEdadGenero = {
          labels: labelsDistribucionEdad,
          datasets: [
            {
              label: "Hombres",
              data: valuesDistEdadGeneroHombres,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "Mujeres",
              data: valuesDistEdadGeneroMujeres,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };
        setDataBarEdadGenero(contenidoBarEdadGenero);
        // Distribución Areas
        const labelsPieAreas = res.data.distribucionAreas.map(
          (item) => item.nombre
        );
        const valuessPieAreas = res.data.distribucionAreas.map(
          (item) => item.cantidad
        );
        const contenidoPieAreas = {
          labels: labelsPieAreas,
          datasets: [
            {
              label: "Total",
              data: valuessPieAreas,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 34, 0.2)",
                "rgba(54, 162, 200, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 34, 1)",
                "rgba(54, 162, 200, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setDataPieArea(contenidoPieAreas);
        // Distribución Cargos
        const labelsPieCargos = res.data.distribucionCargos.map(
          (item) => item.nombre
        );
        const valuessPieCargos = res.data.distribucionCargos.map(
          (item) => item.cantidad
        );
        const contenidoPieCargos = {
          labels: labelsPieCargos,
          datasets: [
            {
              label: "Total",
              data: valuessPieCargos,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 34, 0.2)",
                "rgba(54, 162, 200, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 34, 1)",
                "rgba(54, 162, 200, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setDataPieCargos(contenidoPieCargos);
        setOpen(true);
      })
      .catch((err) => console.log(err)).finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Form>
        <Row>
          <Col className="my-1">
            <Form.Group className="mb-3">
              <Form.Label>Empresa seleccionada</Form.Label>
              <Form.Control placeholder="Banca de Talentos S.R.L" disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaInicio">
              <Form.Label>Mes</Form.Label>
              <select
                name="mes"
                className="custom-select mr-sm-2"
                value={cuerpo.mes}
                onChange={handleChange}
              >
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Arbil</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="text"
                value={cuerpo.ano}
                onChange={handleChange}
                name="ano"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={postCuerpo}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
             {isLoading ? "Generando..." : "Generar"}
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      <Collapse in={open}>
        <div id="example-collapse-text">
          <DocuPDF2
            empresa="Banca de Talentos S.R.L"
            cuerpo={cuerpo}
            dataDonutRegional={dataDonutRegional}
            dataDonutGenero={dataDonutGenero}
            options={options}
            promedioAntiguedad={promedioAntiguedad}
            promedioEdad={promedioEdad}
            dataBarAntGenero={dataBarAntGenero}
            dataBarEdadGenero={dataBarEdadGenero}
            optionsBar={optionsBar}
            dataPieArea={dataPieArea}
            dataPieCargos={dataPieCargos}
          ></DocuPDF2>
        </div>
      </Collapse>
    </>
  );
}
export default FormKPI;
