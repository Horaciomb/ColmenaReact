import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '_state';
import { Nav, Alert, PrivateRoute } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Users } from 'users';
import { Account } from 'account';
import {Menu} from 'gestionPersonal';
import {Personas} from 'gestionPersonal/personas';
import { GestionarEmpleados } from 'gestionPersonal/Empleados';
import {GestionarRcivas} from 'gestionPersonal/Rcivas';
import {ObtenerCargos} from 'gestionPersonal/ObtenerCargo';
import {AsignarCargos} from 'gestionPersonal/AsignarCargos';
import {GestionarIngresos} from 'gestionPersonal/Ingresos';
import {GestionarDescuentos} from 'gestionPersonal/Descuentos';
import {GestionarSubsidios} from 'gestionPersonal/Subsidios';
import {GestionarVacaciones} from 'gestionPersonal/Vacaciones';
import {GestionarSueldos} from 'gestionPersonal/AsignarCargos/GestionarSueldos';
import {GestionarDatosContacto} from 'gestionPersonal/DatosContacto';
import {GestionarInstitucion} from 'gestionPersonal/Institucion';
import {GestionarFormaciones} from 'gestionPersonal/Formaciones';
import {GestionarEmpresas} from 'gestionPersonal/Empresas';
import {GestionarExperienciaLaboral} from 'gestionPersonal/ExperienciaLaboral';
import {GestionarAsignacionAfp} from 'gestionPersonal/AsignacionAfp';
import {GestionarBancos} from 'gestionPersonal/Bancos';
import {GestionarCuentaBancarias}from 'gestionPersonal/CuentaBancarias';
import {Menu as MenuPayRoll} from 'payRoll';
import {PagoSueldos} from 'payRoll/pagoSueldos';
import { PagoAguinaldo } from "payRoll/pagoAguinaldos";
import {PagoPrimas} from 'payRoll/pagoPrimas';
import { PagoFiniquito } from "payRoll/pagoFiniquito";
import { BoletasPago} from "payRoll/BoletasdePago";
import {GestionarPrimas} from "payRoll/GestionarPrimas";
import {PorcesarIncrementoSalarial} from "payRoll/IncrementoSalarial";
import { GestionarNovedades } from 'payRoll/GestionarNovedades';
import { GestionarAporteVejez } from 'payRoll/GestionarNovedades/AporteVejez';
import { GestionarAporteLaboralSolidario } from 'payRoll/GestionarNovedades/AporteLaboralSolidario';
import { GestionarAporteSeguro } from 'payRoll/GestionarNovedades/AporteSeguro';
import { GestionarAporteNacionalSolidario } from 'payRoll/GestionarNovedades/AporteNacionalSolidario';
import { GestionarAportePatronalSolidario } from 'payRoll/GestionarNovedades/AportePatronalSolidario';
import { GestionarBonoAntiguedad } from 'payRoll/GestionarNovedades/BonoAntiguedad';
import { GestionarComisionAdministrador} from 'payRoll/GestionarNovedades/ComisionAdministracion';
import { GestionarAporteRiesgoComun} from 'payRoll/GestionarNovedades/AporteRiesgoComun';
import {GestionarImpuestoRciva} from 'payRoll/GestionarNovedades/ImpuestoRciva'
import {GestionarRiesgoProfesional} from 'payRoll/GestionarNovedades/RiesgoProfesional'
import {GestionarAporteProVivienda} from 'payRoll/GestionarNovedades/AporteProVivienda';
import {GestionarSalarioMinimo} from 'payRoll/GestionarNovedades/SalarioMinimos';
import {GestionarMontoUfv}from 'payRoll/GestionarNovedades/MontoUfv';
import {KPI} from 'kpi';


export { App };

function App() {
    const auth = useRecoilValue(authAtom);

    return (
        <div className={'app-container' + (auth ? ' bg-light' : '')}>
            <Router history={history}>
                <Nav />                
                <Alert />
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/users" component={Users} />
                    <PrivateRoute path="/gestionPersonal" component={Menu} />
                    <PrivateRoute path="/personas" component={Personas} />
                    <PrivateRoute path="/empleados" component={GestionarEmpleados} />
                    <PrivateRoute path="/obtenerCargos" component={ObtenerCargos} />
                    <PrivateRoute path="/asignarCargos" component={AsignarCargos}/>
                    <PrivateRoute path="/gestionarSuledos"component={GestionarSueldos}/>
                    <PrivateRoute path="/gestionarIngresos"component={GestionarIngresos}/>
                    <PrivateRoute path="/gestionarDescuentos"component={GestionarDescuentos}/>
                    <PrivateRoute path="/gestionarSubsidios"component={GestionarSubsidios}/>
                    <PrivateRoute path="/gestionarVacaciones"component={GestionarVacaciones}/>
                    <PrivateRoute path="/gestionarDatosContacto"component={GestionarDatosContacto}/>
                    <PrivateRoute path="/gestionarInstitucion"component={GestionarInstitucion}/>
                    <PrivateRoute path="/gestionarFormaciones"component={GestionarFormaciones}/>
                    <PrivateRoute path="/gestionarEmpresas"component={GestionarEmpresas}/>
                    <PrivateRoute path="/gestionarExperienciaLaboral" component={GestionarExperienciaLaboral}/>
                    <PrivateRoute path="/gestionarRcivas" component={GestionarRcivas} />
                    <PrivateRoute path="/gestionarAsignacionAfp" component={GestionarAsignacionAfp}/>
                    <PrivateRoute path="/gestionarBancos" component={GestionarBancos}/>
                    <PrivateRoute path="/gestionarCuentasBancarias" component={GestionarCuentaBancarias}/>
                    <PrivateRoute path="/payRoll" component={MenuPayRoll} />
                    <PrivateRoute path="/pagosueldos" component={PagoSueldos} />
                    <PrivateRoute path="/pagoaguinaldo" component={PagoAguinaldo} />
                    <PrivateRoute path="/pagoprimas" component={PagoPrimas} />
                    <PrivateRoute path="/pagoafiniquito" component={PagoFiniquito} />
                    <PrivateRoute path="/boletadepago" component={BoletasPago} />
                    <PrivateRoute path="/gestionarPrimas" component={GestionarPrimas}/>
                    <PrivateRoute path="/procesarIncrementoSalarial"component={PorcesarIncrementoSalarial}/>
                    <PrivateRoute path="/gestionarNovedades" component={GestionarNovedades} />
                    <PrivateRoute path="/gestionarAporteVejez" component={GestionarAporteVejez}/>
                    <PrivateRoute path="/gestionarAporteLaboralSolidario" component={GestionarAporteLaboralSolidario} />
                    <PrivateRoute path="/gestionarAporteSeguro" component={GestionarAporteSeguro} />
                    <PrivateRoute path="/gestionarAporteNacionalSolidario" component={GestionarAporteNacionalSolidario}/>
                    <PrivateRoute path="/gestionarAportePatronalSolidario" component={GestionarAportePatronalSolidario}/>
                    <PrivateRoute path="/gestionarBonoAntiguedad" component={GestionarBonoAntiguedad}/>
                    <PrivateRoute path="/gestionarComisionAdministracion" component={GestionarComisionAdministrador}/>
                    <PrivateRoute path="/gestionarAporteRiesgoComun" component={GestionarAporteRiesgoComun}/>
                    <PrivateRoute path="/gestionarImpuestoRciva" component={GestionarImpuestoRciva}/>
                    <PrivateRoute path="/gestionarRiesgoProfesional" component={GestionarRiesgoProfesional}/>
                    <PrivateRoute path="/gestionarAporteProVivienda" component={GestionarAporteProVivienda}/>
                    <PrivateRoute path="/gestionarSalarioMinimo" component={GestionarSalarioMinimo}/>
                    <PrivateRoute path="/gestionarMontoUfv" component={GestionarMontoUfv}/>
                    <PrivateRoute path="/kpi" component={KPI} />
                    <Route path="/account" component={Account} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}
