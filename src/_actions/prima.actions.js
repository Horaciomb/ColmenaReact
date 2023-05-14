import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { history, useFetchWrapper } from '_helpers';
import { primaAtom,primasAtom } from '_state/prima';
export {usePrimaActions};
function usePrimaActions(){
    const baseUrl = `${process.env.REACT_APP_API_URL}/Prima`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setPrimas=useSetRecoilState(primasAtom);
    const setPrima=useSetRecoilState(primaAtom);
}