import React from 'react'
import './Step_1.css'
import Dropzone from 'react-dropzone';
import {TbUpload} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export default function Step_1() {
  return (
    <Dropzone onDrop={acceptedFiles => console.log("Genial")}   className='shadow'>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()} className="center">
                      <input {...getInputProps()} accept=".html"/>
                      <TbUpload className='LogoDrag' color={'#fff'}/>
                      <span className='Text mt-3 blue font_Light whiteV2' >Arrastra los pdf requeridos o </span>
                      <span className='Text blue font_Light whiteV2' style={{textAlign:'center'}}>da click al logo para seleccionar</span>
                    </div>
                  </section>
                )}
    </Dropzone>
  )
}
