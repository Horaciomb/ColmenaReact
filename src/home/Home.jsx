
import { useRecoilValue } from 'recoil';
import GrillaCartas from './GrillaCartas'



import { authAtom } from '_state';

export { Home };

function Home() {
    const auth = useRecoilValue(authAtom);

    return (
        <div className="p-4">
            <div className="container  ">
                <h1 >¡Hola {auth?.username}!</h1>
                <p>Bienvenido a Colmena</p>
                
                <GrillaCartas></GrillaCartas>
            </div>                      
        </div>
    );
}
