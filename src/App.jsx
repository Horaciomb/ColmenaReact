import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
import "./App.scss";
import { Alert, PrivateRoute } from "_components";
import { history } from "_helpers";
import { Home } from "home";
import { Users } from "users";
import { Account } from "account";
// Gestion de Personal
import { Menu } from "gestionPersonal";
import { Personas } from "gestionPersonal/personas";
import { GestionarEmpleados } from "gestionPersonal/Empleados";
import { GestionarRcivas } from "gestionPersonal/Rcivas";
import { ObtenerCargos } from "gestionPersonal/ObtenerCargo";
import { AsignarCargos } from "gestionPersonal/AsignarCargos";
import { GestionarIngresos } from "gestionPersonal/Ingresos";
import { GestionarDescuentos } from "gestionPersonal/Descuentos";
import { GestionarSubsidios } from "gestionPersonal/Subsidios";
import { GestionarVacaciones } from "gestionPersonal/Vacaciones";
import { GestionarSueldos } from "gestionPersonal/AsignarCargos/GestionarSueldos";
import { GestionarDatosContacto } from "gestionPersonal/DatosContacto";
import { GestionarInstitucion } from "gestionPersonal/Institucion";
import { GestionarFormaciones } from "gestionPersonal/Formaciones";
import { GestionarEmpresas } from "gestionPersonal/Empresas";
import { GestionarExperienciaLaboral } from "gestionPersonal/ExperienciaLaboral";
import { GestionarAsignacionAfp } from "gestionPersonal/AsignacionAfp";
import { GestionarAsignacionGestora } from "gestionPersonal/AsignacionGestora";
import { GestionarBancos } from "gestionPersonal/Bancos";
import { GestionarCuentaBancarias } from "gestionPersonal/CuentaBancarias";
// Gestiona de la Organizacion
import { gestionOrganizacion } from "gestionOrganizacion";
import { gestionarPerfilEmpresa } from "gestionOrganizacion/GestionarEmpresas";
import { gestDatosContactoEmpresa } from "gestionOrganizacion/GestionarDatosContactoEmpresa";
import { GestionarTiposAreas } from "gestionOrganizacion/TiposAreas";
import { GestionarAreas } from "gestionOrganizacion/Areas";
import { GestionarCargos} from "gestionOrganizacion/Cargos";
import { GestionarCentroCostos } from "gestionOrganizacion/CentrosCostos";
import { RepCenCos} from "gestionOrganizacion/ReportesCentrosCostos";
import { GenerarMapagrama } from "gestionOrganizacion/Mapagramas";
// PayRoll
import { Menu as MenuPayRoll } from "payRoll";
import { PagoSueldos } from "payRoll/pagoSueldos";
import { PagoAguinaldo } from "payRoll/pagoAguinaldos";
import { PagoPrimas } from "payRoll/pagoPrimas";
import { PagoFiniquito } from "payRoll/pagoFiniquito";
import { BoletasPago } from "payRoll/BoletasdePago";
import { GestionarPrimas } from "payRoll/GestionarPrimas";
import { PorcesarIncrementoSalarial } from "payRoll/IncrementoSalarial";
import { GestionarNovedades } from "payRoll/GestionarNovedades";
import { GestionarAporteVejez } from "payRoll/GestionarNovedades/AporteVejez";
import { GestionarAporteLaboralSolidario } from "payRoll/GestionarNovedades/AporteLaboralSolidario";
import { GestionarAporteSeguro } from "payRoll/GestionarNovedades/AporteSeguro";
import { GestionarAporteNacionalSolidario } from "payRoll/GestionarNovedades/AporteNacionalSolidario";
import { GestionarAportePatronalSolidario } from "payRoll/GestionarNovedades/AportePatronalSolidario";
import { GestionarBonoAntiguedad } from "payRoll/GestionarNovedades/BonoAntiguedad";
import { GestionarComisionAdministrador } from "payRoll/GestionarNovedades/ComisionAdministracion";
import { GestionarAporteRiesgoComun } from "payRoll/GestionarNovedades/AporteRiesgoComun";
import { GestionarImpuestoRciva } from "payRoll/GestionarNovedades/ImpuestoRciva";
import { GestionarRiesgoProfesional } from "payRoll/GestionarNovedades/RiesgoProfesional";
import { GestionarAporteProVivienda } from "payRoll/GestionarNovedades/AporteProVivienda";
import { GestionarSalarioMinimo } from "payRoll/GestionarNovedades/SalarioMinimos";
import { GestionarMontoUfv } from "payRoll/GestionarNovedades/MontoUfv";
import { KPI } from "kpi";
import AuthorizedRoute from "_components/AuthorizedRoute";
import RootLayout from "layouts/RootLayout";

export { App };

function App() {
  const auth = useRecoilValue(authAtom);

  return (
    <div className={auth ? " bg-light d-flex flex-column min-vh-100" : "bg-light min-vh-100"}>
      <Router history={history}>
        <RootLayout>
          <Alert />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <AuthorizedRoute
              path="/users"
              component={Users}
              roles={["app-gerenteGeneral"]}
            />
            {/* Gestión de Personal */}
            <AuthorizedRoute
              path="/gestionPersonal"
              component={Menu}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/personas"
              component={Personas}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/empleados"
              component={GestionarEmpleados}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/obtenerCargos"
              component={ObtenerCargos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/asignarCargos"
              component={AsignarCargos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarSuledos"
              component={GestionarSueldos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarIngresos"
              component={GestionarIngresos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarDescuentos"
              component={GestionarDescuentos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarSubsidios"
              component={GestionarSubsidios}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarVacaciones"
              component={GestionarVacaciones}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarDatosContacto"
              component={GestionarDatosContacto}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarInstitucion"
              component={GestionarInstitucion}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarFormaciones"
              component={GestionarFormaciones}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarEmpresas"
              component={GestionarEmpresas}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarExperienciaLaboral"
              component={GestionarExperienciaLaboral}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarRcivas"
              component={GestionarRcivas}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarAsignacionAfp"
              component={GestionarAsignacionAfp}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarAsignacionGestora"
              component={GestionarAsignacionGestora}
            />
            <AuthorizedRoute
              path="/gestionarBancos"
              component={GestionarBancos}
            />
            <AuthorizedRoute
              path="/gestionarCuentasBancarias"
              component={GestionarCuentaBancarias}
            />
            {/* Gestión de la Organización */}
            <AuthorizedRoute
              path="/gestionOrganizacion"
              component={gestionOrganizacion}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarPerfilEmpresa"
              component={gestionarPerfilEmpresa}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestDatosContactoEmpresa"
              component={gestDatosContactoEmpresa}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarTiposAreas"
              component={GestionarTiposAreas}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarAreas"
              component={GestionarAreas}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarCargos"
              component={GestionarCargos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/gestionarCentroCostos"
              component={GestionarCentroCostos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/reporteCentroCostos"
              component={RepCenCos}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            <AuthorizedRoute
              path="/generarMapagrama"
              component={GenerarMapagrama}
              roles={["app-gerenteGeneral", "app-analistaPersonal"]}
            />
            
            
            {/* PayRoll */}
            <AuthorizedRoute path="/payRoll" component={MenuPayRoll} roles={["app-gerenteGeneral","app-responsablePayRoll"]} />
            <AuthorizedRoute path="/pagosueldos" component={PagoSueldos} roles={["app-gerenteGeneral","app-responsablePayRoll"]}/>
            <AuthorizedRoute path="/pagoaguinaldo" component={PagoAguinaldo} roles={["app-gerenteGeneral","app-responsablePayRoll"]} />
            <AuthorizedRoute path="/pagoprimas" component={PagoPrimas} roles={["app-gerenteGeneral","app-responsablePayRoll"]} />
            <AuthorizedRoute path="/pagoafiniquito" component={PagoFiniquito} roles={["app-gerenteGeneral","app-responsablePayRoll"]} />
            <AuthorizedRoute path="/boletadepago" component={BoletasPago} roles={["app-gerenteGeneral","app-responsablePayRoll"]} />
            <AuthorizedRoute path="/gestionarPrimas" component={GestionarPrimas} roles={["app-gerenteGeneral","app-responsablePayRoll"]}/>
            <AuthorizedRoute
              path="/procesarIncrementoSalarial"
              component={PorcesarIncrementoSalarial}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarNovedades"
              component={GestionarNovedades}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAporteVejez"
              component={GestionarAporteVejez}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAporteLaboralSolidario"
              component={GestionarAporteLaboralSolidario}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAporteSeguro"
              component={GestionarAporteSeguro}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAporteNacionalSolidario"
              component={GestionarAporteNacionalSolidario}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAportePatronalSolidario"
              component={GestionarAportePatronalSolidario}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarBonoAntiguedad"
              component={GestionarBonoAntiguedad}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarComisionAdministracion"
              component={GestionarComisionAdministrador}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAporteRiesgoComun"
              component={GestionarAporteRiesgoComun}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarImpuestoRciva"
              component={GestionarImpuestoRciva}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarRiesgoProfesional"
              component={GestionarRiesgoProfesional}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarAporteProVivienda"
              component={GestionarAporteProVivienda}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarSalarioMinimo"
              component={GestionarSalarioMinimo}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            <AuthorizedRoute
              path="/gestionarMontoUfv"
              component={GestionarMontoUfv}
              roles={["app-gerenteGeneral","app-responsablePayRoll"]}
            />
            {/* KPI */}
            <AuthorizedRoute path="/kpi" component={KPI}  roles={["app-gerenteGeneral","app-gerenteRRHH"]}/>
            <Route path="/account" component={Account} />
            <Redirect from="*" to="/" />
          </Switch>
        </RootLayout>
      </Router>
    </div>
  );
}
