import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import jwtDecode from "jwt-decode";
import { useAlertActions } from "_actions";

import { history, useFetchWrapper } from "_helpers";
import {
  authAtom,
  usersAtom,
  userAtom,
  personasAtom,
  personaAtom,
  empresaAtom,
  empresasAtom,
  empleadoAtom,
  empleadosAtom,
  contratosAtom,
  contratoAtom,
  SueldoAtom,
  SueldosAtom,
  IngresoAtom,
  IngresosAtom,
  DescuentoAtom,
  DescuentosAtom,
  SubsidioAtom,
  SubsidiosAtom,
  VacacionesAtom,
  VacacionAtom,
  DatosContactoAtom,
  DatosContactosAtom,
  DatosContactoEmpresaAtom,
  DatosContactosEmpresasAtom,
  InstitucionAtom,
  InstitucionesAtom,
  FormacionAtom,
  FormacionesAtom,
  ExpLaboralAtom,
  ExpLaboralesAtom,
  AsignacionAfpAtom,
  AsignacionAfpsAtom,
  AsigancionGestoraAtom,
  AsigancionGestorasAtom,
  BancoAtom,
  BancosAtom,
  CuentaBancariaAtom,
  CuentasBancariasAtom,
  primaAtom,
  primasAtom,
  AporteVejezPorcentajesAtom,
  AporteVejezPorcentajeAtom,
  AporteLaboralSolidarioPorcentajeAtom,
  AporteLaboralSolidarioPorcentajesAtom,
  AporteSeguroAtom,
  AporteSegurosAtom,
  AporteNacionalSolidarioAtom,
  AporteNacionalSolidariosAtom,
  AportePatronalSolidarioAtom,
  AportePatronalSolidariosAtom,
  BonoAntigedadPorcentajeAtom,
  BonoAntigedadPorcentajesAtom,
  ComisionAfpAtom,
  ComisionAfpsAtom,
  AporteRiesgoComunAtom,
  AporteRiesgoComunsAtom,
  ImpuestoRcivaAtom,
  ImpuestoRcivasAtom,
  RiesgoProfesionalAtom,
  RiesgoProfesionalesAtom,
  AporteProViviendasAtom,
  AporteProViviendaAtom,
  SalarioMinimoAtom,
  SalarioMinimosAtom,
  MontoUfvAtom,
  MontoUfvsAtom,
  RcivaAtom,
  RcivasAtom,
  // Gestion de la Organización
  TipoAreaAtom,
  TiposAreasAtom,
  AreaAtom,
  AreasAtom,
  CargoAtom,
  CargosAtom,
  CentroCostoAtom,
  CentrosCostosAtom,
} from "_state";

export { useUserActions };

function useUserActions() {
  const alertActions = useAlertActions();
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const personasApiUrl = `${process.env.REACT_APP_API_URL}/Personas`;
  const empresasApiUrl = `${process.env.REACT_APP_API_URL}/Empresas`;
  const empleadosApiUrl = `${process.env.REACT_APP_API_URL}/Empleados`;
  const contratosApisUrl = `${process.env.REACT_APP_API_URL}/Contratos`;
  const primaApiUrl = `${process.env.REACT_APP_API_URL}/Prima`;
  // Administracion de Personal
  const rcivaApiUrl = `${process.env.REACT_APP_API_URL}/Rcivas`;
  const sueldosApiUrl = `${process.env.REACT_APP_API_URL}/Sueldos`;
  const ingresoApiUrl = `${process.env.REACT_APP_API_URL}/Ingresos`;
  const descuentoApiUrl = `${process.env.REACT_APP_API_URL}/Descuentos`;
  const subsidioApiUrl = `${process.env.REACT_APP_API_URL}/Subsidios`;
  const vacacionApiUrl = `${process.env.REACT_APP_API_URL}/VacacionesTomadas`;
  const datosContactoPersonaApiUrl = `${process.env.REACT_APP_API_URL}/DatosContactoPersonas`;
  const datosContactoEmpresaApiUrl = `${process.env.REACT_APP_API_URL}/DatosContactoEmpresas`;
  const institucionesApisUrl = `${process.env.REACT_APP_API_URL}/Instituciones`;
  const formacionesApisUrl = `${process.env.REACT_APP_API_URL}/Formaciones`;
  const expLaboralesApisUrl = `${process.env.REACT_APP_API_URL}/ExperienciaLaborales`;
  const asignacionAfpApiUrl = `${process.env.REACT_APP_API_URL}/AsignacionAfps`;
  const asignacionGestoraUrl = `${process.env.REACT_APP_API_URL}/AsignacionGestoras`;
  const bancoApiUrl = `${process.env.REACT_APP_API_URL}/Bancos`;
  const cuentaBancariaApisUrl = `${process.env.REACT_APP_API_URL}/CuentasBancarias`;
  // Gestionar Novedades
  const aporteVejezApiUrl = `${process.env.REACT_APP_API_URL}/AporteVejezPorcentajes`;
  const aporteLaboralSolidarioApiUrl = `${process.env.REACT_APP_API_URL}/AporteLaboralSolidarios`;
  const aporteSeguroApisUrl = `${process.env.REACT_APP_API_URL}/CnsseguroCortoPlazos`;
  const aporteNacionalSolidariosApiUrl = `${process.env.REACT_APP_API_URL}/AporteSolidarioPorcentajes`;
  const aportePatronalSolidarioApisApiUrl = `${process.env.REACT_APP_API_URL}/PatronalSolidarios`;
  const bonoAntiguedadApiUrl = `${process.env.REACT_APP_API_URL}/BonoAntiguedadPorcentajes`;
  const comisionAfpApiUrl = `${process.env.REACT_APP_API_URL}/ComisionAfps`;
  const aporteRiesgoComunApiUrl = `${process.env.REACT_APP_API_URL}/PrimaRiesgoComuns`;
  const impuestoRcivaApiUrl = `${process.env.REACT_APP_API_URL}/PorcentajeRcivas`;
  const riesgoProfesionalApiUrl = `${process.env.REACT_APP_API_URL}/AfpriesgoProfesionales`;
  const aporteProViviendaApiUrl = `${process.env.REACT_APP_API_URL}/ProViviendas`;
  const salarioMinimoApiUrl = `${process.env.REACT_APP_API_URL}/SMNs`;
  const montoUfvApiUrl = `${process.env.REACT_APP_API_URL}/Ufvs`;
  // Gestión de Organización
  const tipoAreaApiUrl = `${process.env.REACT_APP_API_URL}/TipoAreas`;
  const areasApiUrl = `${process.env.REACT_APP_API_URL}/Areas`;
  const cargosApiUrl = `${process.env.REACT_APP_API_URL}/Cargos`;
  const centroCostoApiUrl = `${process.env.REACT_APP_API_URL}/CentroCostos`;
  const fetchWrapper = useFetchWrapper();
  const [auth, setAuth] = useRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setUser = useSetRecoilState(userAtom);
  // Personas
  const setPersona = useSetRecoilState(personaAtom);
  const setPersonas = useSetRecoilState(personasAtom);
  //Empresa
  const setEmpresa = useSetRecoilState(empresaAtom);
  const setEmpresas = useSetRecoilState(empresasAtom);
  // Empleados
  const setEmpleado = useSetRecoilState(empleadoAtom);
  const setEmpleados = useSetRecoilState(empleadosAtom);
  // Contratos
  const setContratos = useSetRecoilState(contratosAtom);
  const setContrato = useSetRecoilState(contratoAtom);
  // Sueldos
  const setSueldos = useSetRecoilState(SueldosAtom);
  const setSueldo = useSetRecoilState(SueldoAtom);
  // Ingresos
  const setIngresos = useSetRecoilState(IngresosAtom);
  const setIngreso = useSetRecoilState(IngresoAtom);
  // Descuentos
  const setDescuento = useSetRecoilState(DescuentoAtom);
  const setDescuentos = useSetRecoilState(DescuentosAtom);
  // Subsidios
  const setSubsidio = useSetRecoilState(SubsidioAtom);
  const setSubsidios = useSetRecoilState(SubsidiosAtom);
  // Vacaciones
  const setVacacion = useSetRecoilState(VacacionAtom);
  const setVacaciones = useSetRecoilState(VacacionesAtom);
  // Datos Contacto Personas
  const setDatosContacto = useSetRecoilState(DatosContactoAtom);
  const setDatosContactos = useSetRecoilState(DatosContactosAtom);
  // Datos Contacto Empresas
  const setDatosContactoEmpresa = useSetRecoilState(DatosContactoEmpresaAtom);
  const setDatosContactosEmpresas = useSetRecoilState(
    DatosContactosEmpresasAtom
  );
  // Institutiones
  const setInstitucion = useSetRecoilState(InstitucionAtom);
  const setInstituciones = useSetRecoilState(InstitucionesAtom);
  // Formaciones
  const setFormacion = useSetRecoilState(FormacionAtom);
  const setFormaciones = useSetRecoilState(FormacionesAtom);
  // Experiencias Laborales
  const setExperienciaLaboral = useSetRecoilState(ExpLaboralAtom);
  const setExperienciasLaborales = useSetRecoilState(ExpLaboralesAtom);
  // Asignacion AFPs
  const setAsignacionAfp = useSetRecoilState(AsignacionAfpAtom);
  const setAsignacionAfps = useSetRecoilState(AsignacionAfpsAtom);
  // Asignacion Gestora
  const setAsignacionGestora = useSetRecoilState(AsigancionGestoraAtom);
  const setAsignacionGestoras = useSetRecoilState(AsigancionGestorasAtom);
  // Bancos
  const setBancos = useSetRecoilState(BancosAtom);
  const setBanco = useSetRecoilState(BancoAtom);
  // Cuenta Bancarias
  const setCuentaBancarias = useSetRecoilState(CuentasBancariasAtom);
  const setCuentaBancaria = useSetRecoilState(CuentaBancariaAtom);
  // Primas
  const setPrimas = useSetRecoilState(primasAtom);
  const setPrima = useSetRecoilState(primaAtom);
  // Administracion Personal
  const setRciva = useSetRecoilState(RcivaAtom);
  const setRcivas = useSetRecoilState(RcivasAtom);
  // Gestionar Novedades
  // Aporte Vejez
  const setAporteVejezPorcentaje = useSetRecoilState(AporteVejezPorcentajeAtom);
  const setAporteVejezPorcentajes = useSetRecoilState(
    AporteVejezPorcentajesAtom
  );
  // Aporte Laboral Solidario
  const setAporteLaboralSolidarioPorcentaje = useSetRecoilState(
    AporteLaboralSolidarioPorcentajeAtom
  );
  const setAporteLaboralSolidarioPorcentajes = useSetRecoilState(
    AporteLaboralSolidarioPorcentajesAtom
  );
  // Aporte Seguro
  const setAporteSeguro = useSetRecoilState(AporteSeguroAtom);
  const setAporteSeguros = useSetRecoilState(AporteSegurosAtom);
  // Aporte Nacional Solidario
  const setAporteNacionalSolidario = useSetRecoilState(
    AporteNacionalSolidarioAtom
  );
  const setAporteNacionalSolidarios = useSetRecoilState(
    AporteNacionalSolidariosAtom
  );
  // Aporte Patronal Solidario
  const setAportePatronalSolidario = useSetRecoilState(
    AportePatronalSolidarioAtom
  );
  const setAportePatronalSolidarios = useSetRecoilState(
    AportePatronalSolidariosAtom
  );
  // Bono Antiguedad
  const setBonoAntiguedad = useSetRecoilState(BonoAntigedadPorcentajeAtom);
  const setBonoAntiguedades = useSetRecoilState(BonoAntigedadPorcentajesAtom);
  // ComisionAfp
  const setComisionAfp = useSetRecoilState(ComisionAfpAtom);
  const setComisionAfps = useSetRecoilState(ComisionAfpsAtom);
  // Aporte Riesgo Común
  const setAporteRiesgoComun = useSetRecoilState(AporteRiesgoComunAtom);
  const setAporteRiesgoComuns = useSetRecoilState(AporteRiesgoComunsAtom);
  // Impuesto RCIVA
  const setImpuestoRciva = useSetRecoilState(ImpuestoRcivaAtom);
  const setImpuestoRcivas = useSetRecoilState(ImpuestoRcivasAtom);
  // Riesgo Profesional
  const setRiesgoProfesional = useSetRecoilState(RiesgoProfesionalAtom);
  const setRiesgoProfesionales = useSetRecoilState(RiesgoProfesionalesAtom);
  // Aporte Pro Vivienda
  const setAporteProVivienda = useSetRecoilState(AporteProViviendaAtom);
  const setAporteProViviendas = useSetRecoilState(AporteProViviendasAtom);
  // Salario Minimo
  const setSalarioMinimo = useSetRecoilState(SalarioMinimoAtom);
  const setSalarioMinimos = useSetRecoilState(SalarioMinimosAtom);
  // Monto Ufv
  const setMonteUfv = useSetRecoilState(MontoUfvAtom);
  const setMontUfvs = useSetRecoilState(MontoUfvsAtom);
  // Gestión de Organizacion
  // Tipo Areas
  const setTipoArea = useSetRecoilState(TipoAreaAtom);
  const setTiposAreas = useSetRecoilState(TiposAreasAtom);
  // Áreas
  const setArea = useSetRecoilState(AreaAtom);
  const setAreas = useSetRecoilState(AreasAtom);
  // Cargos
  const setCargo=useSetRecoilState(CargoAtom);
  const setCargos=useSetRecoilState(CargosAtom);
  // Centro Costos
  const setCentroCosto=useSetRecoilState(CentroCostoAtom);
  const setCentrosCostos=useSetRecoilState(CentrosCostosAtom);

  return {
    login,
    loginKeycloak,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    resetUsers: useResetRecoilState(usersAtom),
    resetUser: useResetRecoilState(userAtom),
    //Persona
    registrarPersona,
    getPersonas,
    getPersonasId,
    updatePersona,
    deletePersona: _deletePersona,
    saveDataPersonas,
    resetPersonas: useResetRecoilState(personasAtom),
    resetPersona: useResetRecoilState(personaAtom),
    //Empresa
    registrarEmpresa,
    getEmpresas,
    getEmpresaId,
    updateEmpresa,
    deleteEmpresa,
    resetEmpresas: useResetRecoilState(empresasAtom),
    resetEmpresa: useResetRecoilState(empresaAtom),
    // Empleado
    registrarEmpleado,
    getEmpleados,
    getEmpleadosId,
    getEmpleadosVacaciones,
    updateEmpleado,
    deleteEmpleado,
    resetEmpleados: useResetRecoilState(empleadosAtom),
    resetEmpleado: useResetRecoilState(empleadoAtom),
    // Contratos
    registrarContrato,
    registrarContratoConSueldo,
    getContratos,
    getContratoById,
    updateContrato,
    deleteContrato,
    deleteContrato2,
    resetContrato: useResetRecoilState(contratoAtom),
    resetContratos: useResetRecoilState(contratosAtom),
    // Sueldos
    registrarSueldo,
    getSueldos,
    getSueldoById,
    updateSueldo,
    deleteSueldo,
    deleteSueldo2,
    resetSueldo: useResetRecoilState(SueldoAtom),
    resetSuelos: useResetRecoilState(SueldosAtom),
    // Ingresos
    registrarIngreso,
    getIngresos,
    getIngresoId,
    updateIngreso,
    deleteIngreso,
    resetIngreso: useResetRecoilState(IngresoAtom),
    resetIngresos: useResetRecoilState(IngresosAtom),
    // Descuentos
    registrarDescuento,
    getDescuentos,
    getDescuentoId,
    updateDescuento,
    deleteDescuento,
    resetDescuento: useResetRecoilState(DescuentoAtom),
    resetDescuentos: useResetRecoilState(DescuentosAtom),
    // Subsidios
    registrarSubsidio,
    getSubsidios,
    getSubsidioId,
    updateSubsidio,
    deleteSubsidio,
    resetSubsidio: useResetRecoilState(SubsidioAtom),
    resetSubsidios: useResetRecoilState(SubsidiosAtom),
    // Vacaciones
    registrarVacacion,
    getVacaciones,
    getVacacionById,
    updateVacacion,
    deleteVacacion,
    resetVacacion: useResetRecoilState(VacacionAtom),
    resetVacaciones: useResetRecoilState(VacacionesAtom),
    // Datos Contacto
    registrarDatosContacto,
    getDatosContactos,
    getDatosContactoById,
    updateDatosContacto,
    deleteDatosContacto,
    resetDatosContacto: useResetRecoilState(DatosContactoAtom),
    resetDatosContactos: useResetRecoilState(DatosContactosAtom),
    // Datos Contacto Empresa
    registrarDatosContactoEmpresa,
    getDatosContactosEmpresas,
    getDatosContactoEmpresaById,
    updateDatosContactoEmpresa,
    deleteDatosContactoEmpresa,
    resetDatosContactoEmpresa: useResetRecoilState(DatosContactoEmpresaAtom),
    resetDatosContactosEmpresas: useResetRecoilState(
      DatosContactosEmpresasAtom
    ),
    // Instituciones
    registrarInstitucion,
    getInstituciones,
    getInstitucionById,
    updateInstitucion,
    deleteInstitucion,
    resetInstitucion: useResetRecoilState(InstitucionAtom),
    resetInstituciones: useResetRecoilState(InstitucionesAtom),
    // Formaciones
    registrarFormacion,
    getFormaciones,
    getFormacionById,
    updateFormacion,
    deleteFormacion,
    resetFormacion: useResetRecoilState(FormacionAtom),
    resetFormaciones: useResetRecoilState(FormacionesAtom),
    // Experiencia Laboral
    registrarExperienciaLaboral,
    getExperienciasLaborales,
    getExperienciaLaboralById,
    updateExperienciaLaboral,
    deleteExperienciaLaboral,
    resetExperienciaLaboral: useResetRecoilState(ExpLaboralAtom),
    resetExperienciaLaborales: useResetRecoilState(ExpLaboralesAtom),
    // Asignacion AFP
    registrarAsignacionAfp,
    getAsignacionAfps,
    getAsignacionAfpById,
    updateAsignacionAfp,
    deleteAsignacionAfp,
    resetAsignacionAfp: useResetRecoilState(AsignacionAfpAtom),
    resetAsignacionAfps: useResetRecoilState(AsignacionAfpsAtom),
    // Asignacion Gestora
    registrarAsignacionGestora,
    getAsignacionGestoras,
    getAsignacionGestoraById,
    updateAsignacionGestora,
    deleteAsignacionGestora,
    resetAsignacionGestora: useResetRecoilState(AsigancionGestoraAtom),
    resetAsignacionGestoras: useResetRecoilState(AsigancionGestoraAtom),
    // Bancos
    registrarBanco,
    getBancos,
    getBancoById,
    updateBanco,
    deleteBanco,
    deleteBanco2,
    resetBanco: useResetRecoilState(BancoAtom),
    resetBancos: useResetRecoilState(BancosAtom),
    // Cuenta Bancarias
    registrarCuentaBancaria,
    getCuentasBancarias,
    getCuentaBancariaById,
    updateCuentaBancaria,
    deleteCuentaBancaria,
    deleteCuentaBancariaNoUpdate,
    resetCuentaBancaria: useResetRecoilState(CuentaBancariaAtom),
    resetCuentaBancarias: useResetRecoilState(CuentasBancariasAtom),
    // Primas
    registrarPrima,
    getPrimas,
    getPrimaId,
    updatePrima,
    deletePrima: _deletePrima,
    resetPrimas: useResetRecoilState(primasAtom),
    resetPrima: useResetRecoilState(primaAtom),
    // Administracion Personal
    registrarRciva,
    getRcivas,
    getRcivaById,
    updateRciva,
    deleteRciva,
    resetRciva: useResetRecoilState(RcivaAtom),
    resetRcivas: useResetRecoilState(RcivasAtom),
    // Gestionar Novedades
    // Aporte Vejez
    resgistrarAporteVejezPorcentaje,
    getAporteVejPorcentajes,
    getAporteVejPorcentajeId,
    updateAporteVejPorcentaje,
    deletAportePorcentaje: _deleteAporteVejPorcentaje,
    resetAporteVejezPorcentaje: useResetRecoilState(AporteVejezPorcentajeAtom),
    resetAporteVejezPorcentajes: useResetRecoilState(
      AporteVejezPorcentajesAtom
    ),
    // Aporte Laboral Solidario
    registrarAporteLaboralSolidario,
    getAporteLaboralSolidarioPorcentajes,
    getAporteLaboralSolidarioPorcentajeId,
    updateAporteLaboralSolidarioPorcentaje,
    deleteAporteLaboralSolidarioPorcentaje:
      _deleteAporteLaboralSolidarioPorcentaje,
    resetAporteLaboralSolidarioPorcentaje: useResetRecoilState(
      AporteLaboralSolidarioPorcentajeAtom
    ),
    resetAporteLaboralSolidarioPorcentajes: useResetRecoilState(
      AporteLaboralSolidarioPorcentajesAtom
    ),
    // Aporte Seguro
    registrarAporteSeguro,
    getAporteSeguros,
    getAporteSeguroId,
    updateAporteSeguro,
    deleteAporteSeguro,
    resetAporteSeguro: useResetRecoilState(AporteSeguroAtom),
    resetAporteSeguros: useResetRecoilState(AporteSegurosAtom),
    // Aporte Nacional Solidario
    resgistrarAporteNacionalSolidario,
    getAporteNacionalSolidarios,
    getAporteNacionalSolidarioId,
    updateAporteNacionalSolidario,
    deleteAporteNacionalSolidario,
    resetAporteNacionalSolidario: useResetRecoilState(
      AporteNacionalSolidarioAtom
    ),
    resetAporteNacionalSolidarios: useResetRecoilState(
      AporteNacionalSolidariosAtom
    ),
    // Aporte Patronal Solidario
    registrarAportePatronalSolidario,
    getAportePatronalSolidarios,
    getAportePatronalSolidarioId,
    updateAportePatronalSolidario,
    deleteAportePatronalSolidario,
    resetAportePatronalSolidario: useResetRecoilState(
      AportePatronalSolidarioAtom
    ),
    resetAportePatronalSolidarios: useResetRecoilState(
      AportePatronalSolidariosAtom
    ),
    // Bono Antiguedad
    registrarBonoAntiguedad,
    getBonoAntiguedades,
    getBonoAntiguedadesById,
    updateBonoAntiguedad,
    deleteBonoAntiguedad,
    resetBonoAntiguedad: useResetRecoilState(BonoAntigedadPorcentajeAtom),
    resetBonoAntiguedades: useResetRecoilState(BonoAntigedadPorcentajesAtom),
    // Comision Afp
    registrarComisionAfp,
    getComisionAfps,
    getComisionAfpById,
    updateComisionAfp,
    deleteComisionAfp,
    resetComisionAfp: useResetRecoilState(ComisionAfpAtom),
    resetComisionAfps: useResetRecoilState(ComisionAfpsAtom),
    // Aporte Riesgo Comun
    registrarAporteRiesgoComun,
    getAporteRiesgoComuns,
    getAporteRiesgoComunById,
    updateAporteRiesgoComun,
    deleteAporteRiesgoComun,
    resetAporteRiesgoComun: useResetRecoilState(AporteRiesgoComunAtom),
    resetAporteRiesgoComuns: useResetRecoilState(AporteRiesgoComunsAtom),
    // Impuesto RCIVA
    registrarImpuestoRciva,
    getImpuestoRcivas,
    getImpuestoRcivasById,
    updateImpuestoRciva,
    deleteImpuestoRciva,
    resetImpuestoRciva: useResetRecoilState(ImpuestoRcivaAtom),
    resetImpuestoRcivas: useResetRecoilState(ImpuestoRcivasAtom),
    // Riesgo Profesional
    resgistrarRiesgoProfesional,
    getRiesgoProfesionales,
    getRiesgoProfesionalById,
    updateRiesgoProfesional,
    deleteRiesgoProfesional,
    resetRiesgoProfesional: useResetRecoilState(RiesgoProfesionalAtom),
    resetRiesgoProfesionales: useResetRecoilState(RiesgoProfesionalesAtom),
    // Aporte Pro-Vivienda
    resgistrarAporteProVivienda,
    getAporteProViviendas,
    getAporteProViviendaById,
    updateAporteProVivienda,
    deleteAporteProVivienda,
    resetAporteProVivienda: useResetRecoilState(AporteProViviendaAtom),
    resetAporteProViviendas: useResetRecoilState(AporteProViviendasAtom),
    // Salario Minimo
    resgistrarSalarioMinimo,
    getSalarioMinimos,
    getSalarioMinimoById,
    updateSalarioMinimo,
    deleteSalarioMinimo,
    resetSalarioMinimo: useResetRecoilState(SalarioMinimoAtom),
    resetSalarioMinimos: useResetRecoilState(SalarioMinimosAtom),
    // Monto UFV
    resgistrarMontoUfv,
    getMontUfvs,
    getMonteUfvById,
    updateMontoUfv,
    deleteMontoUfv,
    resetMontoUfv: useResetRecoilState(MontoUfvAtom),
    resetMontoUfvs: useResetRecoilState(MontoUfvsAtom),
    // Gestión de la Organización
    // Tipos de Areas
    registrarTipoArea,
    getTiposAreas,
    getTipoAreaById,
    updateTipoArea,
    deleteTipoArea,
    resetTipoArea: useResetRecoilState(TipoAreaAtom),
    resetTiposAreas: useResetRecoilState(TiposAreasAtom),
    // Áreas
    registrarArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea,
    resetArea: useResetRecoilState(AreaAtom),
    resetAreas: useResetRecoilState(AreasAtom),
    // Cargo
    registrarCargo,
    getCargos,
    getCargoById,
    updateCargo,
    deleteCargo,
    resetCargo: useResetRecoilState(CargoAtom),
    resetCargos: useResetRecoilState(CargosAtom),
    // Centro Costos
    registrarCentroCosto,
    getCentrosCostos,
    getCentroCostoById,
    updateCentroCosto,
    deleteCentroCosto,
    resetCentroCosto: useResetRecoilState(CentroCostoAtom),
    reserCentrosCostos: useResetRecoilState(CentrosCostosAtom),
  };

  function login({ username, password }) {
    return fetchWrapper
      .post(`${baseUrl}/Authenticate`, { username, password })
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        setAuth(user);

        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: "/" } };
        history.push(from);
      });
  }
  function loginKeycloak({ username, password }) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=password&client_id=colmena-webapi&client_secret=kHe2bZJokpQ4v0cjvntIn75NStuvaWcg&username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
    };
    return fetch(
      "http://localhost:8080/realms/ColmenaRealm/protocol/openid-connect/token",
      requestOptions
    )
      .then(handleResponse)
      .then((data) => {
        const decodedToken = jwtDecode(data.access_token);
        const roles = decodedToken.realm_access.roles;
        const username = decodedToken.preferred_username;
        const user = {
          token: data.access_token,
          idkeycloak: decodedToken.sub,
          organizacion: decodedToken.azp,
          roles: roles,
          username: username,
          name: decodedToken.name,
          nombre: decodedToken.given_name,
          apeliido: decodedToken.family_name,
        };
        // Refresh
        const decodedTokenRefresh = jwtDecode(data.refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        setAuth(user);
        console.log(user);
        const { from } = history.location.state || { from: { pathname: "/" } };
        history.push(from);
      });
  }
  function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem("user");
          setAuth(null);
          history.push("/account/login");
        }

        const error = (data && data.message) || response.statusText;
        alertActions.error(error);
        return Promise.reject(error);
      }

      return data;
    });
  }
  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    history.push("/account/login");
  }

  function register(user) {
    return fetchWrapper.post(`${baseUrl}/registrar`, user);
  }

  function getAll() {
    return fetchWrapper.get(baseUrl).then(setUsers);
  }

  function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`).then(setUser);
  }

  function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
      // update stored user if the logged in user updated their own record
      if (id === auth?.id) {
        // update local storage
        const user = { ...auth, ...params };
        localStorage.setItem("user", JSON.stringify(user));

        // update auth user in recoil state
        setAuth(user);
      }
      return x;
    });
  }

  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(id) {
    setUsers((users) =>
      users.map((x) => {
        // add isDeleting prop to user being deleted
        if (x.id === id) return { ...x, isDeleting: true };

        return x;
      })
    );

    return fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      // remove user from list after deleting
      setUsers((users) => users.filter((x) => x.id !== id));

      // auto logout if the logged in user deleted their own record
      if (id === auth?.id) {
        logout();
      }
    });
  }

  //CRUD Persona
  function registrarPersona(persona) {
    return fetchWrapper.post(`${personasApiUrl}`, persona);
  }
  function getPersonas() {
    return fetchWrapper.get(`${personasApiUrl}`).then(setPersonas);
  }
  function getPersonasId(id) {
    return fetchWrapper.get(`${personasApiUrl}/${id}`).then(setPersona);
  }
  function updatePersona(id, params) {
    return fetchWrapper.put(`${personasApiUrl}/${id}`, params).then((x) => {
      // update stored user if the logged in user updated their own record
      if (id === auth?.id) {
        // update local storage
        const persona = { ...auth, ...params };
        localStorage.setItem("persona", JSON.stringify(persona));

        // update auth user in recoil state
        setAuth(persona);
      }
      return x;
    });
  }
  function saveDataPersonas(ide) {
    localStorage.setItem("ide", ide);
  }
  function _deletePersona(id) {
    setPersonas((personas) =>
      personas.map((x) => {
        // add isDeleting prop to user being deleted
        if (x.id === id) return { ...x, isDeleting: true };

        return x;
      })
    );

    return fetchWrapper.delete(`${personasApiUrl}/${id}`).then(() => {
      // remove user from list after deleting
      setPersonas((personas) => personas.filter((x) => x.id !== id));

      // auto logout if the logged in user deleted their own record
      if (id === auth?.id) {
        logout();
      }
    });
  }
  // CRUD Empresa
  function registrarEmpresa(empresa) {
    return fetchWrapper.post(`${empresasApiUrl}`, empresa);
  }

  function getEmpresas() {
    return fetchWrapper.get(empresasApiUrl).then(setEmpresas);
  }

  function getEmpresaId(id) {
    return fetchWrapper.get(`${empresasApiUrl}/${id}`).then(setEmpresa);
  }

  function updateEmpresa(id, params) {
    return fetchWrapper.put(`${empresasApiUrl}/${id}`, params);
  }

  async function deleteEmpresa(id) {
    setEmpresas((empresas) =>
      empresas.map((empresa) => {
        if (empresa.id === id) return { ...empresa, isDeleting: true };
        return empresa;
      })
    );

    await fetchWrapper.delete(`${empresasApiUrl}/${id}`).then(() => {
      setEmpresas((empresas) =>
        empresas.filter((empresa) => empresa.id !== id)
      );
    });
  }

  // CRUD Empleados
  function registrarEmpleado(empleado) {
    return fetchWrapper.post(`${empleadosApiUrl}`, empleado);
  }
  function getEmpleados() {
    return fetchWrapper.get(empleadosApiUrl).then(setEmpleados);
  }
  function getEmpleadosVacaciones() {
    return fetchWrapper.get(`${empleadosApiUrl}/vacaciones`).then(setEmpleados);
  }
  function getEmpleadosId(id) {
    return fetchWrapper.get(`${empleadosApiUrl}/${id}`).then(setEmpleado);
  }
  function updateEmpleado(id, params) {
    return fetchWrapper.put(`${empleadosApiUrl}/${id}`, params);
  }

  async function deleteEmpleado(id) {
    setEmpleados((empleados) =>
      empleados.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${empleadosApiUrl}/${id}`).then(() => {
      setEmpleados((empleados) => empleados.filter((x) => x.id !== id));
    });
  }
  // CRUD Contratos
  function registrarContrato(contrato) {
    return fetchWrapper.post(`${contratosApisUrl}`, contrato);
  }
  function registrarContratoConSueldo(contrato) {
    return fetchWrapper.post(`${contratosApisUrl}/registerconSueldo`, contrato);
  }
  function getContratos() {
    return fetchWrapper.get(contratosApisUrl).then(setContratos);
  }

  function getContratoById(id) {
    return fetchWrapper.get(`${contratosApisUrl}/${id}`).then(setContrato);
  }

  function updateContrato(id, params) {
    return fetchWrapper.put(`${contratosApisUrl}/${id}`, params);
  }

  async function deleteContrato(id) {
    setContratos((contratos) =>
      contratos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${contratosApisUrl}/${id}`).then(() => {
      setContratos((contratos) => contratos.filter((x) => x.id !== id));
    });
  }
  async function deleteContrato2(id) {
    await fetchWrapper.delete(`${contratosApisUrl}/${id}`);
    // setContratos((contratos) => contratos.filter((x) => x.id !== id));
  }
  // CRUD Sueldos
  function registrarSueldo(sueldo) {
    return fetchWrapper.post(`${sueldosApiUrl}`, sueldo);
  }

  function getSueldos() {
    return fetchWrapper.get(sueldosApiUrl).then(setSueldos);
  }

  function getSueldoById(id) {
    return fetchWrapper.get(`${sueldosApiUrl}/${id}`).then(setSueldo);
  }

  function updateSueldo(id, params) {
    return fetchWrapper.put(`${sueldosApiUrl}/${id}`, params);
  }

  async function deleteSueldo(id) {
    setSueldos((sueldos) =>
      sueldos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${sueldosApiUrl}/${id}`).then(() => {
      setSueldos((sueldos) => sueldos.filter((x) => x.id !== id));
    });
  }
  async function deleteSueldo2(id) {
    await fetchWrapper.delete(`${sueldosApiUrl}/${id}`);
  }
  // CRUD Ingresos
  function registrarIngreso(ingreso) {
    return fetchWrapper.post(`${ingresoApiUrl}`, ingreso);
  }
  function getIngresos() {
    return fetchWrapper.get(ingresoApiUrl).then(setIngresos);
  }
  function getIngresoId(id) {
    return fetchWrapper.get(`${ingresoApiUrl}/${id}`).then(setIngreso);
  }
  function updateIngreso(id, params) {
    return fetchWrapper.put(`${ingresoApiUrl}/${id}`, params);
  }
  async function deleteIngreso(id) {
    setIngresos((ingresos) =>
      ingresos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${ingresoApiUrl}/${id}`).then(() => {
      setIngresos((ingresos) => ingresos.filter((x) => x.id !== id));
    });
  }
  // CRUD Descuentos
  function registrarDescuento(descuento) {
    return fetchWrapper.post(`${descuentoApiUrl}`, descuento);
  }
  function getDescuentos() {
    return fetchWrapper.get(descuentoApiUrl).then(setDescuentos);
  }
  function getDescuentoId(id) {
    return fetchWrapper.get(`${descuentoApiUrl}/${id}`).then(setDescuento);
  }
  function updateDescuento(id, params) {
    return fetchWrapper.put(`${descuentoApiUrl}/${id}`, params);
  }
  async function deleteDescuento(id) {
    setDescuentos((descuentos) =>
      descuentos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${descuentoApiUrl}/${id}`).then(() => {
      setDescuentos((descuentos) => descuentos.filter((x) => x.id !== id));
    });
  }
  // CRUD Subsidios
  function registrarSubsidio(subsidio) {
    return fetchWrapper.post(subsidioApiUrl, subsidio);
  }

  function getSubsidios() {
    return fetchWrapper.get(subsidioApiUrl).then(setSubsidios);
  }

  function getSubsidioId(id) {
    return fetchWrapper.get(`${subsidioApiUrl}/${id}`).then(setSubsidio);
  }

  function updateSubsidio(id, params) {
    return fetchWrapper.put(`${subsidioApiUrl}/${id}`, params);
  }

  async function deleteSubsidio(id) {
    setSubsidios((subsidios) =>
      subsidios.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${subsidioApiUrl}/${id}`).then(() => {
      setSubsidios((subsidios) => subsidios.filter((x) => x.id !== id));
    });
  }
  // CRUD Vacaciones
  function registrarVacacion(vacacion) {
    return fetchWrapper.post(`${vacacionApiUrl}`, vacacion);
  }

  function getVacaciones() {
    return fetchWrapper.get(vacacionApiUrl).then(setVacaciones);
  }

  function getVacacionById(id) {
    return fetchWrapper.get(`${vacacionApiUrl}/${id}`).then(setVacacion);
  }

  function updateVacacion(id, params) {
    return fetchWrapper.put(`${vacacionApiUrl}/${id}`, params);
  }

  async function deleteVacacion(id) {
    setVacaciones((vacaciones) =>
      vacaciones.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${vacacionApiUrl}/${id}`).then(() => {
      setVacaciones((vacaciones) => vacaciones.filter((x) => x.id !== id));
    });
  }
  // CRUD Datos Contacto
  function registrarDatosContacto(datosContacto) {
    return fetchWrapper.post(`${datosContactoPersonaApiUrl}`, datosContacto);
  }

  function getDatosContactos() {
    return fetchWrapper.get(datosContactoPersonaApiUrl).then(setDatosContactos);
  }

  function getDatosContactoById(id) {
    return fetchWrapper
      .get(`${datosContactoPersonaApiUrl}/${id}`)
      .then(setDatosContacto);
  }

  function updateDatosContacto(id, params) {
    return fetchWrapper.put(`${datosContactoPersonaApiUrl}/${id}`, params);
  }

  async function deleteDatosContacto(id) {
    setDatosContactos((contactos) =>
      contactos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper
      .delete(`${datosContactoPersonaApiUrl}/${id}`)
      .then(() => {
        setDatosContactos((contactos) => contactos.filter((x) => x.id !== id));
      });
  }
  // CRUD Datos Contacto Empresa
  function registrarDatosContactoEmpresa(datosContactoEmpresa) {
    return fetchWrapper.post(
      `${datosContactoEmpresaApiUrl}`,
      datosContactoEmpresa
    );
  }

  function getDatosContactosEmpresas() {
    return fetchWrapper
      .get(datosContactoEmpresaApiUrl)
      .then(setDatosContactosEmpresas);
  }

  function getDatosContactoEmpresaById(id) {
    return fetchWrapper
      .get(`${datosContactoEmpresaApiUrl}/${id}`)
      .then(setDatosContactoEmpresa);
  }

  function updateDatosContactoEmpresa(id, params) {
    return fetchWrapper.put(`${datosContactoEmpresaApiUrl}/${id}`, params);
  }

  async function deleteDatosContactoEmpresa(id) {
    setDatosContactosEmpresas((datosContactoEmpresas) =>
      datosContactoEmpresas.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper
      .delete(`${datosContactoEmpresaApiUrl}/${id}`)
      .then(() => {
        setDatosContactosEmpresas((datosContactoEmpresas) =>
          datosContactoEmpresas.filter((x) => x.id !== id)
        );
      });
  }

  // CRUD Instituciones
  function registrarInstitucion(institucion) {
    return fetchWrapper.post(`${institucionesApisUrl}`, institucion);
  }
  function getInstituciones() {
    return fetchWrapper.get(institucionesApisUrl).then(setInstituciones);
  }
  function getInstitucionById(id) {
    return fetchWrapper
      .get(`${institucionesApisUrl}/${id}`)
      .then(setInstitucion);
  }
  function updateInstitucion(id, params) {
    return fetchWrapper.put(`${institucionesApisUrl}/${id}`, params);
  }
  async function deleteInstitucion(id) {
    setInstituciones((instituciones) =>
      instituciones.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${institucionesApisUrl}/${id}`).then(() => {
      setInstituciones((instituciones) =>
        instituciones.filter((x) => x.id !== id)
      );
    });
  }
  // CRUD Formaciones
  function registrarFormacion(formacion) {
    return fetchWrapper.post(formacionesApisUrl, formacion);
  }

  function getFormaciones() {
    return fetchWrapper.get(formacionesApisUrl).then(setFormaciones);
  }

  function getFormacionById(id) {
    return fetchWrapper.get(`${formacionesApisUrl}/${id}`).then(setFormacion);
  }

  function updateFormacion(id, params) {
    return fetchWrapper.put(`${formacionesApisUrl}/${id}`, params);
  }

  async function deleteFormacion(id) {
    setFormaciones((formaciones) =>
      formaciones.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${formacionesApisUrl}/${id}`).then(() => {
      setFormaciones((formaciones) => formaciones.filter((x) => x.id !== id));
    });
  }
  // CRUD Experiencia Laboral
  function registrarExperienciaLaboral(expLaboral) {
    return fetchWrapper.post(`${expLaboralesApisUrl}`, expLaboral);
  }

  function getExperienciasLaborales() {
    return fetchWrapper.get(expLaboralesApisUrl).then(setExperienciasLaborales);
  }

  function getExperienciaLaboralById(id) {
    return fetchWrapper
      .get(`${expLaboralesApisUrl}/${id}`)
      .then(setExperienciaLaboral);
  }

  function updateExperienciaLaboral(id, params) {
    return fetchWrapper.put(`${expLaboralesApisUrl}/${id}`, params);
  }

  async function deleteExperienciaLaboral(id) {
    setExperienciasLaborales((exp) =>
      exp.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${expLaboralesApisUrl}/${id}`).then(() => {
      setExperienciasLaborales((exp) => exp.filter((x) => x.id !== id));
    });
  }
  // CRUD Asignacion AFP
  function registrarAsignacionAfp(asignacionAfp) {
    return fetchWrapper.post(`${asignacionAfpApiUrl}`, asignacionAfp);
  }

  function getAsignacionAfps() {
    return fetchWrapper.get(asignacionAfpApiUrl).then(setAsignacionAfps);
  }

  function getAsignacionAfpById(id) {
    return fetchWrapper
      .get(`${asignacionAfpApiUrl}/${id}`)
      .then(setAsignacionAfp);
  }

  function updateAsignacionAfp(id, params) {
    return fetchWrapper.put(`${asignacionAfpApiUrl}/${id}`, params);
  }

  async function deleteAsignacionAfp(id) {
    setAsignacionAfps((asignacion) =>
      asignacion.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${asignacionAfpApiUrl}/${id}`).then(() => {
      setAsignacionAfps((asignacion) => asignacion.filter((x) => x.id !== id));
    });
  }
  // CRUD Asignacion Gestora
  function registrarAsignacionGestora(asignacionGestora) {
    return fetchWrapper.post(`${asignacionGestoraUrl}`, asignacionGestora);
  }

  function getAsignacionGestoras() {
    return fetchWrapper.get(asignacionGestoraUrl).then(setAsignacionGestoras);
  }

  function getAsignacionGestoraById(id) {
    return fetchWrapper
      .get(`${asignacionGestoraUrl}/${id}`)
      .then(setAsignacionGestora);
  }

  function updateAsignacionGestora(id, params) {
    return fetchWrapper.put(`${asignacionGestoraUrl}/${id}`, params);
  }

  async function deleteAsignacionGestora(id) {
    setAsignacionGestoras((asignacion) =>
      asignacion.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${asignacionGestoraUrl}/${id}`).then(() => {
      setAsignacionGestoras((asignacion) =>
        asignacion.filter((x) => x.id !== id)
      );
    });
  }

  // Bancos
  function registrarBanco(banco) {
    return fetchWrapper.post(`${bancoApiUrl}`, banco);
  }

  function getBancos() {
    return fetchWrapper.get(bancoApiUrl).then(setBancos);
  }

  function getBancoById(id) {
    return fetchWrapper.get(`${bancoApiUrl}/${id}`).then(setBanco);
  }

  function updateBanco(id, params) {
    return fetchWrapper.put(`${bancoApiUrl}/${id}`, params);
  }

  async function deleteBanco(id) {
    setBancos((bancos) =>
      bancos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${bancoApiUrl}/${id}`).then(() => {
      setBancos((bancos) => bancos.filter((x) => x.id !== id));
    });
  }
  async function deleteBanco2(id) {
    await fetchWrapper.delete(`${bancoApiUrl}/${id}`);
  }
  // Cuentas Bancarias
  function registrarCuentaBancaria(cuentaBancaria) {
    return fetchWrapper.post(`${cuentaBancariaApisUrl}`, cuentaBancaria);
  }

  function getCuentasBancarias() {
    return fetchWrapper.get(cuentaBancariaApisUrl).then(setCuentaBancarias);
  }

  function getCuentaBancariaById(id) {
    return fetchWrapper
      .get(`${cuentaBancariaApisUrl}/${id}`)
      .then(setCuentaBancaria);
  }

  function updateCuentaBancaria(id, params) {
    return fetchWrapper.put(`${cuentaBancariaApisUrl}/${id}`, params);
  }

  async function deleteCuentaBancaria(id) {
    setCuentaBancarias((cuentasBancarias) =>
      cuentasBancarias.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${cuentaBancariaApisUrl}/${id}`).then(() => {
      setCuentaBancarias((cuentasBancarias) =>
        cuentasBancarias.filter((x) => x.id !== id)
      );
    });
  }

  async function deleteCuentaBancariaNoUpdate(id) {
    await fetchWrapper.delete(`${cuentaBancariaApisUrl}/${id}`);
  }

  // CRUD Primas
  function registrarPrima(prima) {
    return fetchWrapper.post(`${primaApiUrl}`, prima);
  }
  function getPrimas() {
    return fetchWrapper.get(primaApiUrl).then(setPrimas);
  }
  function getPrimaId(id) {
    return fetchWrapper.get(`${primaApiUrl}/${id}`).then(setPrima);
  }
  function updatePrima(id, params) {
    return fetchWrapper.put(`${primaApiUrl}/${id}`, params);
  }
  function _deletePrima(id) {
    setPrimas((primas) =>
      primas.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    return fetchWrapper.delete(`${primaApiUrl}/${id}`).then(() => {
      setPrimas((primas) => primas.filter((x) => x.id !== id));
    });
  }
  // Administracion de Personal
  // CRUD Impuesto Laboral RC-IVA
  function registrarRciva(rciva) {
    return fetchWrapper.post(`${rcivaApiUrl}`, rciva);
  }
  function getRcivas() {
    return fetchWrapper.get(rcivaApiUrl).then(setRcivas);
  }
  function getRcivaById(id) {
    return fetchWrapper.get(`${rcivaApiUrl}/${id}`).then(setRciva);
  }
  function updateRciva(id, params) {
    return fetchWrapper.put(`${rcivaApiUrl}/${id}`, params);
  }
  async function deleteRciva(id) {
    setRcivas((rcivas) =>
      rcivas.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${rcivaApiUrl}/${id}`).then(() => {
      setRcivas((rcivas) => rcivas.filter((x) => x.id !== id));
    });
  }
  // Gestionar Novedades
  // CRUD Aporte Vejez Porcentaje
  function resgistrarAporteVejezPorcentaje(aporteVejezPorcentaje) {
    return fetchWrapper.post(`${aporteVejezApiUrl}`, aporteVejezPorcentaje);
  }
  function getAporteVejPorcentajes() {
    return fetchWrapper.get(aporteVejezApiUrl).then(setAporteVejezPorcentajes);
  }
  function getAporteVejPorcentajeId(id) {
    return fetchWrapper
      .get(`${aporteVejezApiUrl}/${id}`)
      .then(setAporteVejezPorcentaje);
  }
  function updateAporteVejPorcentaje(id, params) {
    return fetchWrapper.put(`${aporteVejezApiUrl}/${id}`, params);
  }
  function _deleteAporteVejPorcentaje(id) {
    setAporteVejezPorcentajes((aporteVejezPorcentajes) =>
      aporteVejezPorcentajes.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    return fetchWrapper.delete(`${aporteVejezApiUrl}/${id}`).then(() => {
      setAporteVejezPorcentajes((aporteVejezPorcentajes) =>
        aporteVejezPorcentajes.filter((x) => x.id !== id)
      );
    });
  }
  // CRUD Aporte Laboral Solidario
  function registrarAporteLaboralSolidario(AporteLaboralSolidarioPorcentaje) {
    return fetchWrapper.post(
      `${aporteLaboralSolidarioApiUrl}`,
      AporteLaboralSolidarioPorcentaje
    );
  }
  function getAporteLaboralSolidarioPorcentajes() {
    return fetchWrapper
      .get(aporteLaboralSolidarioApiUrl)
      .then(setAporteLaboralSolidarioPorcentajes);
  }
  function getAporteLaboralSolidarioPorcentajeId(id) {
    return fetchWrapper
      .get(`${aporteLaboralSolidarioApiUrl}/${id}`)
      .then(setAporteLaboralSolidarioPorcentaje);
  }
  function updateAporteLaboralSolidarioPorcentaje(id, params) {
    return fetchWrapper.put(`${aporteLaboralSolidarioApiUrl}/${id}`, params);
  }
  async function _deleteAporteLaboralSolidarioPorcentaje(id) {
    setAporteLaboralSolidarioPorcentajes((aportes) =>
      aportes.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper
      .delete(`${aporteLaboralSolidarioApiUrl}/${id}`)
      .then(() => {
        setAporteLaboralSolidarioPorcentajes((aportes) =>
          aportes.filter((x) => x.id !== id)
        );
      });
  }
  // CRUD Aporte Seguro
  function registrarAporteSeguro(AporteSeguroPorcentaje) {
    return fetchWrapper.post(`${aporteSeguroApisUrl}`, AporteSeguroPorcentaje);
  }
  function getAporteSeguros() {
    return fetchWrapper.get(aporteSeguroApisUrl).then(setAporteSeguros);
  }
  function getAporteSeguroId(id) {
    return fetchWrapper
      .get(`${aporteSeguroApisUrl}/${id}`)
      .then(setAporteSeguro);
  }
  function updateAporteSeguro(id, params) {
    return fetchWrapper.put(`${aporteSeguroApisUrl}/${id}`, params);
  }
  async function deleteAporteSeguro(id) {
    setAporteSeguros((aporte) =>
      aporte.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${aporteSeguroApisUrl}/${id}`).then(() => {
      setAporteSeguros((aporte) => aporte.filter((x) => x.id !== id));
    });
  }
  // CRUD Aporte Nacional Solidario
  function resgistrarAporteNacionalSolidario(AporteNacionalSolidario) {
    return fetchWrapper.post(
      `${aporteNacionalSolidariosApiUrl}`,
      AporteNacionalSolidario
    );
  }
  function getAporteNacionalSolidarios() {
    return fetchWrapper
      .get(aporteNacionalSolidariosApiUrl)
      .then(setAporteNacionalSolidarios);
  }
  function getAporteNacionalSolidarioId(id) {
    return fetchWrapper
      .get(`${aporteNacionalSolidariosApiUrl}/${id}`)
      .then(setAporteNacionalSolidario);
  }
  function updateAporteNacionalSolidario(id, params) {
    return fetchWrapper.put(`${aporteNacionalSolidariosApiUrl}/${id}`, params);
  }
  async function deleteAporteNacionalSolidario(id) {
    setAporteNacionalSolidarios((aporte) =>
      aporte.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper
      .delete(`${aporteNacionalSolidariosApiUrl}/${id}`)
      .then(() => {
        setAporteNacionalSolidarios((aporte) =>
          aporte.filter((x) => x.id !== id)
        );
      });
  }
  // CRUD Aporte Patronal Solidario
  function registrarAportePatronalSolidario(AportePatronalSolidario) {
    return fetchWrapper.post(
      `${aportePatronalSolidarioApisApiUrl}`,
      AportePatronalSolidario
    );
  }
  function getAportePatronalSolidarios() {
    return fetchWrapper
      .get(aportePatronalSolidarioApisApiUrl)
      .then(setAportePatronalSolidarios);
  }
  function getAportePatronalSolidarioId(id) {
    return fetchWrapper
      .get(`${aportePatronalSolidarioApisApiUrl}/${id}`)
      .then(setAportePatronalSolidario);
  }
  function updateAportePatronalSolidario(id, params) {
    return fetchWrapper.put(
      `${aportePatronalSolidarioApisApiUrl}/${id}`,
      params
    );
  }
  async function deleteAportePatronalSolidario(id) {
    setAportePatronalSolidarios((aporte) =>
      aporte.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper
      .delete(`${aportePatronalSolidarioApisApiUrl}/${id}`)
      .then(() => {
        setAportePatronalSolidarios((aporte) =>
          aporte.filter((x) => x.id !== id)
        );
      });
  }
  // CRUD Bono Antiguedad
  function registrarBonoAntiguedad(BonoAntigedadPorcentaje) {
    return fetchWrapper.post(
      `${bonoAntiguedadApiUrl}`,
      BonoAntigedadPorcentaje
    );
  }
  function getBonoAntiguedades() {
    return fetchWrapper.get(bonoAntiguedadApiUrl).then(setBonoAntiguedades);
  }
  function getBonoAntiguedadesById(id) {
    return fetchWrapper
      .get(`${bonoAntiguedadApiUrl}/${id}`)
      .then(setBonoAntiguedad);
  }
  function updateBonoAntiguedad(id, params) {
    return fetchWrapper.put(`${bonoAntiguedadApiUrl}/${id}`, params);
  }
  async function deleteBonoAntiguedad(id) {
    setBonoAntiguedades((bono) =>
      bono.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${bonoAntiguedadApiUrl}/${id}`).then(() => {
      setBonoAntiguedades((bono) => bono.filter((x) => x.id !== id));
    });
  }
  // CRUD Comision Afp
  function registrarComisionAfp(Comision) {
    return fetchWrapper.post(`${comisionAfpApiUrl}`, Comision);
  }
  function getComisionAfps() {
    return fetchWrapper.get(comisionAfpApiUrl).then(setComisionAfps);
  }
  function getComisionAfpById(id) {
    return fetchWrapper.get(`${comisionAfpApiUrl}/${id}`).then(setComisionAfp);
  }
  function updateComisionAfp(id, params) {
    return fetchWrapper.put(`${comisionAfpApiUrl}/${id}`, params);
  }
  async function deleteComisionAfp(id) {
    setComisionAfps((comision) =>
      comision.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${comisionAfpApiUrl}/${id}`).then(() => {
      setComisionAfps((comision) => comision.filter((x) => x.id !== id));
    });
  }
  // CRUD Aporte Riesgo Comun
  function registrarAporteRiesgoComun(aporte) {
    return fetchWrapper.post(`${aporteRiesgoComunApiUrl}`, aporte);
  }
  function getAporteRiesgoComuns() {
    return fetchWrapper
      .get(aporteRiesgoComunApiUrl)
      .then(setAporteRiesgoComuns);
  }
  function getAporteRiesgoComunById(id) {
    return fetchWrapper
      .get(`${aporteRiesgoComunApiUrl}/${id}`)
      .then(setAporteRiesgoComun);
  }
  function updateAporteRiesgoComun(id, params) {
    return fetchWrapper.put(`${aporteRiesgoComunApiUrl}/${id}`, params);
  }
  async function deleteAporteRiesgoComun(id) {
    setAporteRiesgoComuns((aporte) =>
      aporte.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${aporteRiesgoComunApiUrl}/${id}`).then(() => {
      setAporteRiesgoComuns((aporte) => aporte.filter((x) => x.id !== id));
    });
  }
  // CRUD Impuesto RCIVA
  function registrarImpuestoRciva(impuesto) {
    return fetchWrapper.post(`${impuestoRcivaApiUrl}`, impuesto);
  }
  function getImpuestoRcivas() {
    return fetchWrapper.get(impuestoRcivaApiUrl).then(setImpuestoRcivas);
  }
  function getImpuestoRcivasById(id) {
    return fetchWrapper
      .get(`${impuestoRcivaApiUrl}/${id}`)
      .then(setImpuestoRciva);
  }
  function updateImpuestoRciva(id, params) {
    return fetchWrapper.put(`${impuestoRcivaApiUrl}/${id}`, params);
  }
  async function deleteImpuestoRciva(id) {
    setImpuestoRcivas((impuesto) =>
      impuesto.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${impuestoRcivaApiUrl}/${id}`).then(() => {
      setImpuestoRcivas((impuesto) => impuesto.filter((x) => x.id !== id));
    });
  }
  // CRUD Riesgo Profesional
  function resgistrarRiesgoProfesional(riesgo) {
    return fetchWrapper.post(`${riesgoProfesionalApiUrl}`, riesgo);
  }
  function getRiesgoProfesionales() {
    return fetchWrapper
      .get(riesgoProfesionalApiUrl)
      .then(setRiesgoProfesionales);
  }
  function getRiesgoProfesionalById(id) {
    return fetchWrapper
      .get(`${riesgoProfesionalApiUrl}/${id}`)
      .then(setRiesgoProfesional);
  }
  function updateRiesgoProfesional(id, params) {
    return fetchWrapper.put(`${riesgoProfesionalApiUrl}/${id}`, params);
  }
  async function deleteRiesgoProfesional(id) {
    setRiesgoProfesionales((riesgo) =>
      riesgo.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${riesgoProfesionalApiUrl}/${id}`).then(() => {
      setRiesgoProfesionales((riesgo) => riesgo.filter((x) => x.id !== id));
    });
  }
  // CRUD Aporte Pro Vivienda
  function resgistrarAporteProVivienda(aporte) {
    return fetchWrapper.post(`${aporteProViviendaApiUrl}`, aporte);
  }
  function getAporteProViviendas() {
    return fetchWrapper
      .get(aporteProViviendaApiUrl)
      .then(setAporteProViviendas);
  }
  function getAporteProViviendaById(id) {
    return fetchWrapper
      .get(`${aporteProViviendaApiUrl}/${id}`)
      .then(setAporteProVivienda);
  }
  function updateAporteProVivienda(id, params) {
    return fetchWrapper.put(`${aporteProViviendaApiUrl}/${id}`, params);
  }
  async function deleteAporteProVivienda(id) {
    setAporteProViviendas((aporte) =>
      aporte.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${aporteProViviendaApiUrl}/${id}`).then(() => {
      setAporteProViviendas((aporte) => aporte.filter((x) => x.id !== id));
    });
  }
  // CRUD Salario Minimo
  function resgistrarSalarioMinimo(salario) {
    return fetchWrapper.post(`${salarioMinimoApiUrl}`, salario);
  }
  function getSalarioMinimos() {
    return fetchWrapper.get(salarioMinimoApiUrl).then(setSalarioMinimos);
  }
  function getSalarioMinimoById(id) {
    return fetchWrapper
      .get(`${salarioMinimoApiUrl}/${id}`)
      .then(setSalarioMinimo);
  }
  function updateSalarioMinimo(id, params) {
    return fetchWrapper.put(`${salarioMinimoApiUrl}/${id}`, params);
  }
  async function deleteSalarioMinimo(id) {
    setSalarioMinimos((salario) =>
      salario.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${salarioMinimoApiUrl}/${id}`).then(() => {
      setSalarioMinimos((salario) => salario.filter((x) => x.id !== id));
    });
  }
  // CRUD Monto Ufv
  function resgistrarMontoUfv(monto) {
    return fetchWrapper.post(`${montoUfvApiUrl}`, monto);
  }
  function getMontUfvs() {
    return fetchWrapper.get(montoUfvApiUrl).then(setMontUfvs);
  }
  function getMonteUfvById(id) {
    return fetchWrapper.get(`${montoUfvApiUrl}/${id}`).then(setMonteUfv);
  }
  function updateMontoUfv(id, params) {
    return fetchWrapper.put(`${montoUfvApiUrl}/${id}`, params);
  }
  async function deleteMontoUfv(id) {
    setMontUfvs((monto) =>
      monto.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${montoUfvApiUrl}/${id}`).then(() => {
      setMontUfvs((monto) => monto.filter((x) => x.id !== id));
    });
  }
  // Gestión de la Organización
  // CRUD Tipo de Área
  function registrarTipoArea(tipoArea) {
    return fetchWrapper.post(`${tipoAreaApiUrl}`, tipoArea);
  }

  function getTiposAreas() {
    return fetchWrapper.get(tipoAreaApiUrl).then(setTiposAreas);
  }

  function getTipoAreaById(id) {
    return fetchWrapper.get(`${tipoAreaApiUrl}/${id}`).then(setTipoArea);
  }

  function updateTipoArea(id, params) {
    return fetchWrapper.put(`${tipoAreaApiUrl}/${id}`, params);
  }

  async function deleteTipoArea(id) {
    setTiposAreas((tiposAreas) =>
      tiposAreas.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${tipoAreaApiUrl}/${id}`).then(() => {
      setTiposAreas((tiposAreas) => tiposAreas.filter((x) => x.id !== id));
    });
  }
  // CRUD Área
  function registrarArea(area) {
    return fetchWrapper.post(`${areasApiUrl}`, area);
  }
  
  function getAreas() {
    return fetchWrapper.get(areasApiUrl).then(setAreas);
  }
  
  function getAreaById(id) {
    return fetchWrapper
      .get(`${areasApiUrl}/${id}`)
      .then(setArea);
  }
  
  function updateArea(id, params) {
    return fetchWrapper.put(`${areasApiUrl}/${id}`, params);
  }
  
  async function deleteArea(id) {
    setAreas((areas) =>
      areas.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${areasApiUrl}/${id}`).then(() => {
      setAreas((areas) =>
        areas.filter((x) => x.id !== id)
      );
    });
  }
  // CRUD Cargo
  function registrarCargo(cargo) {
    return fetchWrapper.post(`${cargosApiUrl}`, cargo);
  }
  
  function getCargos() {
    return fetchWrapper.get(cargosApiUrl).then(setCargos);
  }
  
  function getCargoById(id) {
    return fetchWrapper
      .get(`${cargosApiUrl}/${id}`)
      .then(setCargo);
  }
  
  function updateCargo(id, params) {
    return fetchWrapper.put(`${cargosApiUrl}/${id}`, params);
  }
  
  async function deleteCargo(id) {
    setCargos((cargos) =>
      cargos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${cargosApiUrl}/${id}`).then(() => {
      setCargos((cargos) =>
        cargos.filter((x) => x.id !== id)
      );
    });
  }
  // CRUD Centro Costos
  function registrarCentroCosto(centroCosto) {
    return fetchWrapper.post(`${centroCostoApiUrl}`, centroCosto);
  }
  
  function getCentrosCostos() {
    return fetchWrapper.get(centroCostoApiUrl).then(setCentrosCostos);
  }
  
  function getCentroCostoById(id) {
    return fetchWrapper
      .get(`${centroCostoApiUrl}/${id}`)
      .then(setCentroCosto);
  }
  
  function updateCentroCosto(id, params) {
    return fetchWrapper.put(`${centroCostoApiUrl}/${id}`, params);
  }
  
  async function deleteCentroCosto(id) {
    setCentrosCostos((centrosCostos) =>
      centrosCostos.map((x) => {
        if (x.id === id) return { ...x, isDeleting: true };
        return x;
      })
    );
    await fetchWrapper.delete(`${centroCostoApiUrl}/${id}`).then(() => {
      setCentrosCostos((centrosCostos) =>
        centrosCostos.filter((x) => x.id !== id)
      );
    });
  }
  
  
}
