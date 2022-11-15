import BreadcrumbExample from './BreadcrumbExample'
import FormPagoSueldos from './FormPagoSueldos'

export {PagoSueldos};
function PagoSueldos(){
    return (
        <div className="p-4">
            <div className="container ">
                <BreadcrumbExample></BreadcrumbExample>
                <h1 >Pago de Sueldos</h1>
                <FormPagoSueldos></FormPagoSueldos>             
            </div>                      
        </div>
    );
}