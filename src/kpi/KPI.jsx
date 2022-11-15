import BreadcrumbExample from './BreadcrumbExample';
import FormKPI from './FormKPI';
export {KPI};
function KPI(){
    return (
        <div className="p-4">
            <div className="container ">
                <BreadcrumbExample></BreadcrumbExample>
                <h1 >KPI</h1>
                <FormKPI></FormKPI>
            </div>                      
        </div>
    );
}