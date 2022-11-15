//import { Link } from 'react-router-dom';
import BreadcrumbExample from './BreadcrumbExample'
import LeftTabsExample from './LeftTabsExample'

export {Menu};
function Menu(){
    return (
        <div className="p-4">
            <div className="container ">
                <BreadcrumbExample></BreadcrumbExample>
                <h1 >Gestión de Personal</h1>
                <LeftTabsExample></LeftTabsExample>                  
            </div>                      
        </div>
    );
}
