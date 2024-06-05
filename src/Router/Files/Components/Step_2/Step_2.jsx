import React from 'react';
import './Step_2.css';
import { FcFile } from "react-icons/fc";

export default function Step_2(props) {

    const updateFiles=(ind)=>{
        let filterArray =  props.saveFiles.filter((obj,index)=> index !== ind)
        if(filterArray.length == 0){
            props.updateFiles(filterArray); // limpiamos la lista
            props.previous_step(); // volvemos al paso anterior para subir los archivos
        }else{
            props.updateFiles(filterArray); // limpiamos la lista
        }
    }
    return ( 
        <>                      
                    {props.saveFiles.map((obj,index)=>{
                        return(
                            <div key={index} className='row row-cols-auto d-flex flex-wrap justify-content-center align-items-start align-self-start justify-content-sm-center align-items-sm-start align-self-sm-start justify-content-md-center align-items-md-start align-self-md-start justify-content-lg-start align-items-lg-start align-self-lg-start justify-content-xl-start align-items-xl-start align-self-xl-start justify-content-xxl-start align-items-xxl-start align-self-xxl-start g-4 ps-2 pe-2'>
                                                    <div className='col d-flex flex-column justify-content-center align-items-center align-self-start wrapper-card-file-'>
                                                        <div style={{'marginBottom':'20px'}}  id="card-file" className='w-100 d-flex flex-row justify-content-center align-items-center align-self-center cursor- focus background-linear-1'>
                                                        <div className='card overflow-out border-0 position-relative  bs-1-'>
                                                            {props.state == '3' ? 
                                                            <></>
                                                            :
                                                            <div className='notiDiv deleteButton'>
                                                                    <span className='font_medium' style={{'cursor':'pointer'}} onClick={()=>updateFiles(index)}>X</span>
                                                            </div>
                                                            }
                                                            
                                                            <div onClick={()=>{
                                                                const enlaceDescarga = URL.createObjectURL(obj);
                                                                const elementoDescarga = document.createElement('a');
                                                                elementoDescarga.href = enlaceDescarga;
                                                                elementoDescarga.download = obj?.name;
                                                                elementoDescarga.click();
                                                                URL.revokeObjectURL(enlaceDescarga);
                                                            }}  className='w-100 h-100 d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                            <FcFile size={60} color={'#fff'}></FcFile>
                                                            </div>
                                                            <span className='font_medium numberInform'>{'1'}</span>
                                                        </div>
                                                        </div>
                                                        <div  className='w-auto mt-3 name_container' style={{'width':'100px'}}>
                                                        <p className='m-0 p-0 lh-sm fs-6-  fw-normal text-center  font_medium name_container' style={{'width':'100px',fontSize:'12px'}} data-bs-toggle="modal" data-bs-target="#edit-folder" >{obj?.name}</p>
                                                        </div>
                                                    </div>
                            </div>
                        )
                    })}
                                        
        </>
    )
}
