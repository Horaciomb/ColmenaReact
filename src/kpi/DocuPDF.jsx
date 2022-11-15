import React from "react";
import {
  Page,
  Text,
  View,
//  Canvas,
  Image,
  Document,
  //StyleSheet,
} from "@react-pdf/renderer";
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
//import { Bar, Doughnut, Pie } from "react-chartjs-2";
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

class DocuPDF extends React.Component {
  render() {
    //const {empresa=""}=this.props.empresa
    return (
      <>
        <Document title="KPI Reporte">
          <Page
            size="A4"
            style={{
              display: "flex",
              flexDirection: "column",
              //justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 10,
              }}
            >
              <Text>Reporte KPI para: {this.props.empresa}</Text>
              <Image src="https://xhfzqtxfckyhqgqnpfeh.supabase.co/storage/v1/object/sign/figuritas/argentina/Guido%20Rodriguez.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWd1cml0YXMvYXJnZW50aW5hL0d1aWRvIFJvZHJpZ3Vlei5wbmciLCJpYXQiOjE2Njc4Mzk4MzEsImV4cCI6MTk4MzE5OTgzMX0.8s3owxJjKtJGn-8BLKW7YA-ho-0M16iHR8CmDDFtr4A" />
            </View>
          </Page>
        </Document>
      </>
    );
  }
}

export default DocuPDF;
