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
import {Menu as MenuPayRoll} from 'payRoll';
import {PagoSueldos} from 'payRoll/pagoSueldos';
import {Afp} from 'gestionPersonal/Afps'
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
                    <PrivateRoute path="/Afps" component={Afp} />
                    <PrivateRoute path="/payRoll" component={MenuPayRoll} />
                    <PrivateRoute path="/pagosueldos" component={PagoSueldos} />
                    <PrivateRoute path="/kpi" component={KPI} />
                    <Route path="/account" component={Account} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}
