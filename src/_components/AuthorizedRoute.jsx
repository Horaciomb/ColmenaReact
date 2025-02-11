import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";

function AuthorizedRoute({ component: Component, roles, ...rest }) {
  const auth = useRecoilValue(authAtom);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth) {
          // No autenticado, redirigir a la página de inicio de sesión
          return <Redirect to="/account" />;
        }

        if (!roles || roles.length === 0 || roles.some((role) => auth.roles.includes(role))) {
          // Usuario autenticado y tiene los roles necesarios
          return <Component {...props} />;
        } else {
          // Usuario autenticado, pero no tiene los roles necesarios
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default AuthorizedRoute;
