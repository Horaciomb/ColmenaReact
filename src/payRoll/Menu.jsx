import BreadcrumbExample from './BreadcrumbExample'
import LeftTabsExample from './LeftTabsExample'

export {Menu};
function Menu(){
    return (
        <div className="p-4">
            <div className="container ">
                <BreadcrumbExample></BreadcrumbExample>
                <h1 >PayRoll</h1>
                <LeftTabsExample></LeftTabsExample>               
            </div>                      
        </div>
    );
}