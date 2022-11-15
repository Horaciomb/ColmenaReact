import { useEffect, useState } from 'react';
import axios from 'axios';
import {Table, Modal, Button} from 'react-bootstrap/';
export {Afp};
function Afp() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/Afps`;
    const [data,setData]=useState([]);
    const [show, setShow] = useState(false);
    //const [modalInsertar, setModalInsertar]= useState(false);
    const [afpSeleccionado,setafpSeleccionado]=useState({
      id:'', nombre:'',descripcion:''  
    })
    const habdleChange=e=>{
        const {nombre,value}=e.target;
        setafpSeleccionado({
            ...afpSeleccionado,[nombre]:value
        })
    };
    /*
    const insertarModal=()=>{
        setModalInsertar(!modalInsertar);
    }
    */
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   /* const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    */
    const peticionPost=async()=>{
        delete afpSeleccionado.id;
        await axios.post(baseUrl,afpSeleccionado)
        .then(response=>{
            setData(data.concat(response.data));
        }).catch(error=>{
            console.log(error);
        })
    }    
    useEffect(()=>{
        //peticionGet();
    },[])

    return(
        <div className="p-4">
            <div className="container ">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(afp=>(
                        <tr key={afp.id}>
                            <td>{afp.id}</td>
                            <td>{afp.nombre}</td>
                            <td>{afp.descripcion}</td>
                            <td>
                                <Button variant="primary" onClick={handleShow}>Editar</Button>

                                <Button variant="danger" onClick={handleShow}>Elmininar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Modal AFP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='form-grop'>
                    <label htmlFor="">Nombre : </label>
                    <input type="text" className='form-contro' name='nombre' onChange={habdleChange} />
                    <br />
                    <label htmlFor="">Descripción : </label>
                    <input type="text" className='form-contro' name='descripcion'onChange={habdleChange} />
                    <br />
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={()=>peticionPost()}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>                         
            </div>                      
        </div>
    );
}
