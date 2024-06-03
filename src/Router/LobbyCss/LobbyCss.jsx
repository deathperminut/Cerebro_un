import React from 'react'
import './LobbyCss.css'
import Fondo from '../../img/Background2.jpg'
import NavBar from '../../Components/NavBar/NavBar'
import Slider from "react-slick";
import BrainModule from '../../img/cerebro_.png'
import { useNavigate } from 'react-router-dom';
import LogoDocuments from '../../Components/LogoDocuments/LogoDocuments';

export default function LobbyCss() {
   
    const navigate=useNavigate();

    // modal useState
    const [modalShow,setModalShow] = React.useState(false);

  return (
      <>
        <NavBar></NavBar>
        <div className='Body' style={{backgroundImage: `url(${Fondo})`,backgroundSize:'cover'}}>
           <div className='LobbyContainer'>
                    <div className='DataLanding'>
                            <p className='TitleLanding font_medium Animation'>Css S.A</p>
                            <p className='SubtitleLanding font_Light Animation'>Empresa de desarrollo e innovación</p> 
                    </div>
                    <div className='DataLandingV2' style={{width:'100%',maxWidth:'1150px','marginBottom':'60px',}}>
                                    <div key={1} className={`LandingModule`} >
                                        <div className={`IconBlueContainerV2`} >
                                              <img src={BrainModule} width={'100'} height={'100'}></img>
                                        </div>
                                        <div className ='DataLandingModule' >
                                          <p className='font_medium' style={{marginTop:'20px',color:'white'}}>CEREBRO</p>
                                                <span className='lineColor' style={{marginBottom:'20px'}}></span>
                                          <p className='font_medium whiteV2 datamodule' style={{fontSize:'12px','maxWidth':'500px','textAlign':'center'}}>Informate de la institución con nuestra IA de lenguaje natural</p>
                                        </div>
                                        <div className='divsContainer'>
                                          <div onClick={()=>navigate('/Chat')}  className='buttonElement'>
                                              <span className='white font_Light'>Ingresar</span>
                                          </div>
                                        </div>
                                        
                                    </div>
                                    <div key={2} className={`LandingModule`} >
                                        <div className={`IconBlueContainerV2`} >
                                              <LogoDocuments width={100} height={100}></LogoDocuments>
                                        </div>
                                        <div className ='DataLandingModule' >
                                          <p className='font_medium' style={{marginTop:'20px',color:'white'}}>ARCHIVOS</p>
                                                <span className='lineColor' style={{marginBottom:'20px'}}></span>
                                          <p className='font_medium whiteV2 datamodule' style={{fontSize:'12px','maxWidth':'500px','textAlign':'center'}}>Sube los documentos para que nuestro cerebro aprenda la información necesaria</p>
                                        </div>
                                        <div className='divsContainer'>
                                          <div onClick={()=>navigate('/Files')}  className='buttonElement'>
                                              <span className='white font_Light'>Ingresar</span>
                                          </div>
                                        </div>
                                        
                                    </div>
                    </div>
            </div>
            <div className='TextData'>
                    <p className='font_medium whiteV2'> Simplificamos la inteligencia artificial para que puedas integrarla fácilmente en tu negocio.</p>
            </div>   
      </div>
      </>
      
  )
}
