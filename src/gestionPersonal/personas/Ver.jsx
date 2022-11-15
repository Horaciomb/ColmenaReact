//import { personasAtom } from '_state';
import { useEffect } from 'react';
//import { useUserActions } from '_actions';

export { Ver };

function Ver({ history, match }){
    //const { id } = match.params;
    //const userActions = useUserActions();
    useEffect(() => {
        // fetch user details into recoil state in edit mode
            //userActions.getPersonasId(id);


    }, []);

    return(
        <h1>ver </h1>
    )
}