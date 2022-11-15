import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { history, useFetchWrapper } from '_helpers';
import { authAtom, usersAtom, userAtom,personasAtom,personaAtom,empresaAtom,empresasAtom } from '_state';

export { useUserActions };

function useUserActions () {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const personasApiUrl = `${process.env.REACT_APP_API_URL}/Personas`;
    const empresasApiUrl = `${process.env.REACT_APP_API_URL}/Empresas`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);
    // Personas
    const setPersona = useSetRecoilState(personaAtom);
    const setPersonas = useSetRecoilState(personasAtom);
    //Empresa
    const setEmpresa= useSetRecoilState(empresaAtom);
    const setEmpresas= useSetRecoilState(empresasAtom);

    return {
        login,
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
        getEmpresas,
        getEmpresasId,
        resetEmpresas: useResetRecoilState(empresasAtom),
        resetEmpresa: useResetRecoilState(empresaAtom),
    }

    function login({ username, password }) {
        return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.push(from);
            });
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/account/login');
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
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const user = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // update auth user in recoil state
                    setAuth(user);
                }
                return x;
            });
    }

    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(id) {
        setUsers(users => users.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id) 
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setUsers(users => users.filter(x => x.id !== id));

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
        return fetchWrapper.get(personasApiUrl).then(setPersonas);
    }
    function getPersonasId(id) {
        return fetchWrapper.get(`${personasApiUrl}/${id}`).then(setPersona);
    }
    function updatePersona(id, params) {
        return fetchWrapper.put(`${personasApiUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const persona = { ...auth, ...params };
                    localStorage.setItem('persona', JSON.stringify(persona));

                    // update auth user in recoil state
                    setAuth(persona);
                }
                return x;
            });
    }
    function saveDataPersonas(ide){
        localStorage.setItem('ide',ide);
    }
    function _deletePersona(id) {
        setPersonas(personas => personas.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${personasApiUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setPersonas(personas => personas.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    // CRUD Empresa
    function getEmpresas() {
        return fetchWrapper.get(empresasApiUrl).then(setEmpresas);
    }
    function getEmpresasId(id) {
        return fetchWrapper.get(`${empresasApiUrl}/${id}`).then(setEmpresa);
    }
}
