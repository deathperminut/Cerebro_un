import React from 'react';
import './NavBar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
    /* NAVIGATE */
    const navigate=useNavigate();

    return (
    <div className='NavBar'>
                <div  className='nameContainer dropdown-toggle d-flex flex-row justify-content-center align-items-center align-self-center' style={{'cursor':'pointer'}}>
                        <span className='nameNavbar font_medium'>
                            <span onClick={()=>navigate('/Lobby')} className='white textNav' style={{'position':'relative','top':'4px','left':'10px',marginRight:'20px'}}>{'Css S.A'}</span>
                            <span onClick={()=>navigate('/Lobby')} className='white textNav' style={{'position':'relative','top':'4px','left':'10px',marginRight:'20px'}}>{'Contactanos'}</span>
                            <span onClick={()=>navigate('/Lobby')} className='white textNav' style={{'position':'relative','top':'4px','left':'10px',marginRight:'20px'}}>{'Sobre nosotros'}</span>
                        </span>
                </div>
    </div>
  )
}
