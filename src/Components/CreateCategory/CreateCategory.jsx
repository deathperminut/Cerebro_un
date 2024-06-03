import React from 'react'
import './CreateCategory.css'
import Modal from 'react-bootstrap/Modal'
import {useNavigate} from 'react-router-dom';
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated';
const { NoOptionsMessage } = components;

export default function CreateCategory(props) {
    
    
    
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              <span className='titleModal font_medium'>Bienvenido al módulo archivos</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='textBodyModal font_Light' style={{textAlign:'center'}}>
              Para crear una nueva categoria registra el nombre en el siguiente campo
          </p>
          <div className='form-floating inner-addon- left-addon-'  style={{'position':'relative','left':'0px'}}>
                        <div className='form-floating inner-addon- left-addon-'>
                                <input type="text" className='form-control form-control_2' id='user' placeholder="Usuario" />
                                <label className='fs-5- ff-monse-regular-'>Nombre</label>
                        </div>         
          </div>
          <div className='divsContainer'>
            <div className='buttonElement'>
                <span className='white font_Light'>Crear</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
}
