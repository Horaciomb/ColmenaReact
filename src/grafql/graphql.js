import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://colmena-webapi.azurewebsites.net/graphql",
  cache: new InMemoryCache(),
});
// Consulta RCIVAS
export const GET_RCIVAS_QUERY = gql`
  {
    rcivas {
      id
      monto
      empleadoId
      fecha
    }
  }
`;

// Consulta Personas
export const GET_PERSONAS_QUERY = gql`
  {
    personas {
      id
      nombre
      apellidoPaterno
      apellidoMaterno
      carnetIdentidad
      estadoCivil {
        id
        nombre
      }
      genero {
        id
        nombre
      }
      fechaNac
      divisionPolitica {
        id
        nombre
      }
      foto
    }
  }
`;
const PERSONA_QUERY = gql`
  query Persona($id: Int!) {
    persona(id: $id) {
      id
      nombre
      apellidoPaterno
      apellidoMaterno
      carnetIdentidad
      estadoCivil {
        id
        nombre
      }
      genero {
        id
        nombre
      }
      fechaNac
      divisionPolitica {
        id
        nombre
        pais {
          nombre
        }
      }
    }
  }
`;
export const getPersonaQuery = (id) => {
  return {
    query: PERSONA_QUERY,
    variables: { id },
  };
};
// Consulta Empleados
export const GET_EMPLEADOS_QUERY = gql`
  {
    empleados {
      id
      codigoEmpleado
      fechaAlta
      fechaBaja
      estado {
        id
        nombre
      }
      persona {
        id
        nombre
        apellidoPaterno
        apellidoMaterno
      }
    }
  }
`;
const EMPLEADO_QUERY = gql`
  query Empleado($id: Int!) {
    empleado(id: $id) {
      id
      codigoEmpleado
      fechaAlta
      fechaBaja
      estado {
        id
        nombre
      }
      persona {
        id
        nombre
        apellidoPaterno
        apellidoMaterno
      }
    }
  }
`;

export const getEmpleadoQuery = (id) => {
  return {
    query: EMPLEADO_QUERY,
    variables: { id },
  };
};
// Consulta Divisiones Politicas

export const GET_DIVISIONES_POLITICAS_QUERY = gql`
  {
    divisionesPoliticas {
      id
      nombre
      pais {
        nombre
      }
    }
  }
`;
// Consulta Cargos
export const GET_CARGOS_QUERY = gql`
  {
    cargos {
      id
      objetivo
      ciudad {
        id
        nombre
      }
      tipoCargo {
        id
        nombre
      }
      area {
        id
        objetivo
        tipoArea {
          nombre
        }
      }
    }
  }
`;
const CARGO_QUERY = gql`
  query Cargo($id: Int!) {
    cargo(id: $id) {
      id
      objetivo
      ciudad {
        nombre
      }
      tipoCargo {
        nombre
      }
      area {
        objetivo
        tipoArea {
          nombre
        }
      }
      contratos {
        id
        fechaInicio
        fechaFin
        horas
        tipoContrato {
          nombre
        }
        empleado {
          id
          codigoEmpleado
          persona {
            nombre
            apellidoPaterno
            apellidoMaterno
          }
        }
      }
    }
  }
`;

export const getCargoQuery = (id) => {
  return {
    query: CARGO_QUERY,
    variables: { id },
  };
};
// Contratos
export const GET_CONTRATOS_QUERY = gql`
  {
    contratos {
      id
      fechaInicio
      fechaFin
      horas
      tipoContrato {
        nombre
      }
      empleado {
        id
        codigoEmpleado
        persona {
          nombre
          apellidoPaterno
          apellidoMaterno
        }
      }
      cargo {
        id
        objetivo
        tipoCargo {
          nombre
        }
        area {
          objetivo
          tipoArea {
            nombre
          }
        }
      }
      sueldos {
        monto
        fechaInicio
        fechaFin
        tipoSueldo {
          nombre
        }
      }
    }
  }
`;
const CONTRATO_QUERY = gql`
  query Contrato($id: Int!) {
    contrato(id: $id) {
      id
      fechaInicio
      fechaFin
      horas
      tipoContrato {
        id
        nombre
      }
      empleado {
        id
        codigoEmpleado
        persona {
          nombre
          apellidoPaterno
          apellidoMaterno
        }
      }
      cargo {
        id
        objetivo
        tipoCargo {
          nombre
        }
        area {
          objetivo
          tipoArea {
            nombre
          }
        }
      }
      sueldos {
        id
        monto
        fechaInicio
        fechaFin
        tipoSueldo {
          nombre
        }
      }
    }
  }
`;

export const getContratoQuery = (id) => {
  return {
    query: CONTRATO_QUERY,
    variables: { id },
  };
};
export const GET_CONTRATO_SUELDOS_QUERY = gql`
  query ContratoSueldos($id: Int!) {
    contrato(id: $id) {
      sueldos {
        id
        fechaInicio
        fechaFin
        monto
        tipoSueldoId
        tipoSueldo {
          id
          nombre
        }
      }
    }
  }
`;

export const getContratoSueldosQuery = (id) => ({
  variables: { id },
  query: GET_CONTRATO_SUELDOS_QUERY,
});
// Tipo Nomina
export const GET_TIPO_NOMINA_QUERY = gql`
  query TipoNomina($id: Int!) {
    tipoNomina(id: $id) {
      id
      nominas {
        id
        descripcion
      }
    }
  }
`;

export const getTipoNominaQuery = (id) => ({
  variables: { id },
  query: GET_TIPO_NOMINA_QUERY,
});
// Vacaciones
export const GET_VACACIONES_TOMADAS_QUERY = gql`
  query VacacionesTomadas($id: Int!) {
    vacacionesTomada(id: $id) {
      id
      diasTomados
      fechaInicio
      empleado {
        id
        persona {
          nombre
          apellidoPaterno
          apellidoMaterno
        }
      }
    }
  }
`;

export const getVacacionesTomadasQuery = (id) => ({
  variables: { id },
  query: GET_VACACIONES_TOMADAS_QUERY,
});
// Formaciones Variables
export const GET_FORMACION_VARIABLES = gql`
  {
    instituciones {
      id
      nombre
      descripcion
      divisionPolitica {
        id
        nombre
        pais {
          id
          nombre
        }
      }
    }
    especialidades {
      id
      nombre
    }
    titulos {
      id
      nombre
    }
    tipoFormaciones {
      id
      nombre
    }
  }
`;
export const GET_EXPERIENCIA_LABORAL_VARIABLES = gql`
  {
    motivoBajas {
      id
      nombre
    }
    tipoCargos {
      id
      nombre
    }
    empresas {
      id
      nombre
      descripcion
    }
  }
`;
// AFPS
export const GET_AFPS_QUERY = gql`
  {
    afps {
      id
      nombre
      descripcion
    }
  }
`;
//Ciudades
export const GET_CIUDADES_QUERY = gql`
  {
    ciudades {
      id
      nombre
      divisionPolitica {
        id
        nombre
        pais {
          id
          nombre
        }
      }
    }
  }
`;
// Bancos
export const GET_BANCOS_QUERY = gql`
  {
    bancos {
      id
      nombre
      descripcion
    }
  }
`;
export const GET_BANCO_QUERY = gql`
  query Banco($id: Int!) {
    banco(id: $id) {
      id
      nombre
      descripcion
    }
  }
`;

export const getBancoQuery = (id) => ({
  variables: { id },
  query: GET_BANCO_QUERY,
});
// Cuentas Bancarias
export const GET_CUENTAS_BANCARIAS_QUERY = gql`
  {
    cuentasBancarias {
      id
      persona {
        id
        nombre
        apellidoPaterno
        apellidoMaterno
      }
      banco {
        id
        nombre
        descripcion
      }
      divisionPolitica {
        id
        nombre
        pais {
          id
          nombre
        }
      }
      tipoCuenta {
        id
        nombre
      }
      nroCuenta
    }
  }
`;
export const GET_CUENTA_BANCARIA_QUERY = gql`
  query CuentaBancaria($id: Int!) {
    cuentasBancaria(id: $id) {
      id
      persona {
        id
        nombre
        apellidoPaterno
        apellidoMaterno
      }
      banco {
        id
        nombre
        descripcion
      }
      divisionPolitica {
        id
        nombre
        pais {
          id
          nombre
        }
      }
      tipoCuenta {
        id
        nombre
      }
      nroCuenta
    }
  }
`;

export const getCuentaBancariaQuery = (id) => ({
  variables: { id },
  query: GET_CUENTA_BANCARIA_QUERY,
});
export const CUENTA_BANCARIA_VARIABLES = gql`
  {
    bancos {
      id
      nombre
      descripcion
    }
    tipoCuentaBancarias {
      id
      nombre
    }
    divisionesPoliticas {
      id
      nombre
      pais {
        id
        nombre
      }
    }
  }
`;

export default client;
