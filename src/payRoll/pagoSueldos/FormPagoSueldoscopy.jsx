import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { empresasAtom } from '_state';
import { useUserActions } from '_actions';
import axios from 'axios';


function FormPagoSueldos() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/PagoSueldos/PagoSueldoEmpresaExcel`;
    const [show, setShow] = useState(false);
    const [empresaSeleccionada,setEmpresaSeleccionada]= useState({
        id:'',nombre:'',descripcion:''
    });
    const [cuerpo,setCuerpo]=useState({
        EmpresaId:'',FechaInicio:'',FechaFin:''
    });


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const seleccionarEmpresa=(empresa)=>{
        //const {name,value}=e.target;
        
        setEmpresaSeleccionada(empresa);
        setCuerpo({
            ...cuerpo,
            EmpresaId:empresa.id
        });
        //console.log(empresaSeleccionada);
        setShow(false);
    }

    const empresas = useRecoilValue(empresasAtom);
    //const empresa = useRecoilValue(empresaAtom);
    const userActions = useUserActions();
    useEffect(()=>{
        console.log(empresaSeleccionada);
    },[empresaSeleccionada]);
    
    useEffect(() => {
        userActions.getEmpresas();
        
        return userActions.resetEmpresas;
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChange=e=>{
        const {name,value}=e.target;
        setCuerpo({
            ...cuerpo,
            [name]:value
        });
        console.log(cuerpo);
    };
    const postCuerpo=e=>{
        e.preventDefault();
        console.log(cuerpo);
        
        axios
        .post(baseUrl,cuerpo)
        .then(res => console.log(res))
        .then(res=>res.blob())
        .catch(err => console.log(err));
    };
    return(
        <>
        <Form>
            <Row className="align-items-center">
                <Col  className="my-1">
                    <Form.Group className="mb-3">
                        <Form.Label>Seleccione una Empresa</Form.Label>
                        <Form.Control placeholder={empresaSeleccionada.nombre}  disabled />
                    </Form.Group>
                </Col>
                <Col xs="auto" className="my-1">
                    <Button variant="primary" onClick={handleShow}>Buscar</Button>
                </Col>
            </Row>
            <Row>                         
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicFechaInicio">
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control type="date" value={cuerpo.FechaInicio} onChange={handleChange} name="FechaInicio"/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicFechaFin">
                        <Form.Label>Fecha de fin</Form.Label>
                        <Form.Control type="date" value={cuerpo.FechaFin} onChange={handleChange} name="FechaFin" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="success"  onClick={postCuerpo}>
                        Imprimir
                    </Button> 
                </Col>    
            </Row>
        </Form>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Buscar Empresa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th style={{ width: '100%' }}>Nombre</th>    
                        <th style={{ width: '100%' }}>Acción</th>                     
                    </tr>
                </thead>
                <tbody>
                {empresas?.map(empresa =>
                        <tr key={empresa.id}>

                            <td>{empresa.nombre}</td>
                            <td >
                                <Button onClick={()=>seleccionarEmpresa(empresa)} className="btn btn-sm btn-succes" >
                                   Seleccionar 
                                </Button>
                            </td>

                        </tr>
                    )}
                    {!empresas &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }   

                </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cerrar
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
export default FormPagoSueldos;