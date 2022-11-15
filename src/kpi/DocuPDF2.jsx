import { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import edad from "../assets/img/edad.png";
import antiguedad from "../assets/img/antiguedad.png";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import Button from "react-bootstrap/Button";
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
import { Bar, Doughnut, Pie } from "react-chartjs-2";
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

class DocuPDF2 extends Component {

  async div2PDF(e) {

    const elements = document.getElementsByClassName("custom-chart");
    const doc = new jsPDF("p", "px");
    doc.text(
      `Repote KPI de${this.props.empresa} - ${this.props.cuerpo.mes}/${this.props.cuerpo.ano}`,
      10,
      10
    );
    const padding = 10;
    const marginTop = 20;
    let top = marginTop;
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const imgData = await htmlToImage.toPng(el);
      let elHeight = el.offsetHeight;
      let elWidth = el.offsetWidth;

      const pageWidth = doc.internal.pageSize.getWidth();

      if (elWidth > pageWidth) {
        const ratio = pageWidth / elWidth;
        elHeight = elHeight * ratio - padding * 2;
        elWidth = elWidth * ratio - padding * 2;
      }

      const pageHeight = doc.internal.pageSize.getHeight();

      if (top + elHeight > pageHeight) {
        doc.addPage();
        top = marginTop;
      }

      doc.addImage(
        imgData,
        "PNG",
        padding,
        top,
        elWidth, 
        elHeight,
        `image${i}`
      );
      top += elHeight + marginTop;
    }
    doc.save(`KPI Reporte de ${this.props.empresa} ${this.props.cuerpo.mes}_${this.props.cuerpo.ano}.pdf`);

  }

  render() {
    return (
      <div>
        <Button
          variant="info"
          onClick={(e) => this.div2PDF(e)}
          aria-controls="example-collapse-text"
        >
          Imprimir
        </Button>
        <Row>
          <Col>
            <Card className="custom-chart" border="dark" text="dark" xs={6}>
              <Card.Body>
                <Card.Title>Distribución Regional de Cargos</Card.Title>
                <Card.Text>
                  <div style={{ height: 250 }}>
                    <Doughnut
                      name="DonutRegional"
                      data={this.props.dataDonutRegional}
                      options={this.props.options}
                    />
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="custom-chart" border="dark" text="dark" xs={6}>
              <Card.Body>
                <Card.Title>Distribución de Género</Card.Title>
                <Card.Text>
                  <div style={{ height: 250 }}>
                    <Doughnut
                      data={this.props.dataDonutGenero}
                      options={this.props.options}
                    />
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Row>
            <Col>
              <Card className="custom-chart" border="dark" text="dark" xs={6}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Promedio de Antiguedad</Card.Title>
                      <Card.Text>
                        <h1 className="display-4">{this.props.promedioAntiguedad}</h1>
                      </Card.Text>
                    </Col>
                    <Col>
                      <img
                        src={antiguedad}
                        alt="0"
                        width="120"
                        align="right"
                      ></img>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="custom-chart" border="dark" text="dark" xs={6}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Promedio de Edad</Card.Title>
                      <Card.Text>
                        <h1 className="display-4">{this.props.promedioEdad}</h1>
                      </Card.Text>
                    </Col>
                    <Col>
                      <img src={edad} alt="0" width="120" align="right"></img>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Card className="custom-chart" border="dark" text="dark" xs={6}>
                <Card.Body>
                  <Card.Title>Distribución por Antigüedad / Género</Card.Title>
                  <Card.Text>
                    <div>
                      <Bar data={this.props.dataBarAntGenero} options={this.props.optionsBar} />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="custom-chart" border="dark" text="dark" xs={6}>
                <Card.Body>
                  <Card.Title>Distribución por Edad / Género</Card.Title>
                  <Card.Text>
                    <div>
                      <Bar data={this.props.dataBarEdadGenero} options={this.props.optionsBar} />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Card className="custom-chart" border="dark" text="dark" xs={6}>
                <Card.Body>
                  <Card.Title>Distribución por Áreas </Card.Title>
                  <Card.Text>
                    <div style={{ height: 350 }}>
                      <Pie data={this.props.dataPieArea} options={this.props.options}></Pie>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="custom-chart" border="dark" text="dark" xs={6}>
                <Card.Body>
                  <Card.Title>Distribución por Cargos</Card.Title>
                  <Card.Text>
                    <div style={{ height: 350 }}>
                      <Pie data={this.props.dataPieCargos} options={this.props.options}></Pie>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default DocuPDF2;
