import React from 'react'
import './Files.css'
import NavBar from '../../Components/NavBar/NavBar'
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated';
import CreateCategory from '../../Components/CreateCategory/CreateCategory';
import EditCategory from '../../Components/EditCategory/EditCategory';
import { MdAutoDelete } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
const { NoOptionsMessage } = components;


const customNoOptionsMessage = props => (
    <NoOptionsMessage {...props} className="custom-no-options-message-internal-form-">No registrado</NoOptionsMessage>
  );
  
  const { LoadingMessage } = components;
  const { ValueContainer, Placeholder } = components;
  const CustomValueContainer = ({ children, ...props }) => {
      const { inputId, placeholder } = props.selectProps;
      return (
        <ValueContainer {...props}>
          <Placeholder htmlFor={inputId} {...props} >
            <span style={{'color':'#FFF'}}>{placeholder}</span>
          </Placeholder>
          {React.Children.map(children, child =>
            child && child.type !== Placeholder ? child : null
          )}
        </ValueContainer>
      );
    };
  const customLoadingMessage = props => (
    <LoadingMessage {...props} className="custom-loading-message-internal-form-">Cargando</LoadingMessage>
  );
  const animatedComponents = makeAnimated();

const selectStyles = {
  /**
  * Estilos del icono del dropdown del select
  * Estilos del separador del select
  * Estilos del icono de cerrar del select
  */
  dropdownIndicator: (styles) => ({ ...styles, 
    color: "#FFF", 
    padding: 0, paddingTop: '0.34rem !important', 
    paddingRight: '0.5rem !important',
    width: '25px',
    height: '25px',
    "&:hover": {
      color: "#414D55",
    } 
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  clearIndicator: (styles) => ({ ...styles, 
    color: "#414D55", 
    padding: 0, 
    paddingTop: '0.05rem !important',
    width: '15px',
    height: '15px',
    "&:hover": {
      color: "#414D55",
    } 
  }),
  /**
  * ESTILOS DEL INPUT GLOBAL
  */
  control: () => ({
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  alignSelf: "start",
  justifyContent: "start",
  height: 'auto',
  minHeight: 50,
  maxHeight: 150,
  paddingLeft: '2.1rem',
  paddingTop: '0.3rem',
  width: "170px",
  backgroundColor: 'transparent',
  borderRadius: 0,
  borderBottom: "1px solid white",
  }),
  /**
  * ESTILOS DEL INPUT
  */
  input: (provided) => ({
  ...provided,
  color: '#FFFFFF',
  fontSize: 13,
  textTransform: "uppercase",
  fontFamily: 'Medium',
  }),
  /**
  * ESTILOS DEL MENU DESPLEGABLE DEL SELECT
  */
  menu: (styles) => ({
  ...styles,
  border: 'none',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 6px 0px',
  borderRadius: '1rem',
  padding: 0,
  marginTop: 8,
  marginBottom: 0,
  height: 'auto',
  minHeight: 'auto',
  maxHeight: 300,
  overflow: "hidden",
  color: '#728998',
  fontSize: 12,
  textTransform: "uppercase",
  fontFamily: 'Medium',
  }),
  menuList: () => ({
    paddingTop: 0,
    paddingBottom: 0,
    height: 'auto',
    minHeight: 'auto',
    maxHeight: 300,
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "0px !important",
      height: "0px !important",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent !important"
    },
    "::-webkit-scrollbar-thumb": {
      background: "transparent !important"
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent !important"
    }
  }),
  /**
  * ESTILOS DE LAS OPCIONES DESPLEGABLES
  */
  option: (provided, state) => ({
  ...provided,
  fontSize: 11,
  textTransform: "uppercase",
  backgroundColor: state.isSelected ? "#47097e" : "rgba(255, 255, 255, 1)",
  fontFamily: 'Medium',
  padding: '0.5rem 0.8rem 0.5rem 0.8rem',
  borderRadius: '1rem',
  ":hover": {
  background: "#47097e",
  color: '#FFFFFF',
  }
  }),
  /**
  * ESTILOS DEL CONTENEDOR
  */
  container: (provided, state) => ({
  ...provided,
  marginTop: 0,
  width: '100%',
  position: 'relative',
  flex: '1 1 auto'
  }),
  valueContainer: (provided, state) => ({
  ...provided,
  overflow: "visible",
  position: "relative",
  top: "4px"
  }),
  /**
  * ESTILOS PLACEHOLDER DEL INPUT
  */
  placeholder: (provided, state) => ({
  ...provided,
  width: '100%',
  position: "absolute",
  top: state.hasValue || state.selectProps.inputValue ? -20 : "22%",
  left: state.hasValue || state.selectProps.inputValue ? -32 : "0%",
  transition: "top 0.1s, font-size 0.1s",
  color: '#FFFFFF',
  fontSize: state.hasValue || state.selectProps.inputValue ? 13 : "14px",
  lineHeight: 1.25,
  fontFamily: 'Medium',
  overflow: 'hidden',
  textAlign: 'start',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
  }),
  /**
  * ESTILOS TEXTO EN EL INPUT
  */
  singleValue: (styles) => ({ 
  ...styles, 
  fontSize: 13,
  textTransform: "uppercase",
  color: "white", 
  fontFamily: 'Medium',
  padding: '3px',
  margin: '0px',
  marginTop: '2px',
  marginLeft: 0,
  marginRight: 0
  }),
  multiValue: (styles) => ({ 
    ...styles, 
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 6px 0px',
    borderRadius: '0.5rem',
    alignItems: 'center',
    alignSelf: 'center',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    fontFamily: 'Medium',
    fontSize: 14,
    color: 'white',
    paddingLeft: '0.5rem',
    paddingRight: '0.6rem',
    paddingBottom: '0.3rem'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    borderRadius: '6rem',
    paddingLeft: '6px',
    width: '26px',
    height: '26px',
    color: '#F8F8F8',
    backgroundColor: '#F8F8F8',
    ':hover': {
      color: '#FFFFFF',
      backgroundColor: '#6149CD',
    }
  })
};

/**
 * Constante que soporta todo el cambio de los estilo del select de las tablas
 */


/**
 * Constante que soporta todo el cambio de los estilo del select para el número de registros en las tablas
 */


const ListAreas = [
    {value:'callcenter',label:'callcenter'},
    {value:'planeacion',label:'planeacion'},
    {value:'investigacion',label:'investigacion'},
    {value:'Auditoria',label:'Auditoria'}
]



export default function Files() {

    // modal useState
    const [modalShow,setModalShow] = React.useState(false);
    const [modalShow2,setModalShow2] = React.useState(false);


    return (
        <> 
            <NavBar></NavBar>
            <div className='bodyFiles'>
                <div className='descriptionFiles'>
                    <p className='whiteV2 font_medium' style={{'textAlign':'center'}}>En el siguiente apartado podras acceder al CRUD de categorias para definir los documentos asociados</p>
                </div>
                <div className='divsContainer'>
                        <div className='buttonElement' onClick={()=>setModalShow(true)}>
                            <span className='white font_Light'>Crear categoria</span>
                        </div>
                </div>
                
                {/* <div className='form-floating inner-addon- left-addon- divSelect'  style={{'position':'relative','left':'0px'}}>
                        <Select  options={ListAreas}  id='customSelect'  components={{ ValueContainer: CustomValueContainer, animatedComponents, NoOptionsMessage: customNoOptionsMessage, LoadingMessage: customLoadingMessage }} placeholder="Area" styles={selectStyles} isClearable={false}/>
                </div> */}
                <div className='FilesContainer' style={{'marginTop':'40px'}}>
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                    <div className='card border-0 rounded-0 w-100 bg-transparent'>
                        <div className='card-body p-0 w-100'>
                        <div className='table-responsive table-general-'>
                            <table id='table-medication-order-' className='table table-sm table-striped table-no-border- align-middle'>
                            <thead>
                            <tr>
                                <th scope="col" className='th-width-xs-'>
                                <div className='d-flex flex-row justify-content-start align-items-center align-self-center w-100'>
                                    <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple-'></span>
                                </div>
                                </th>
                                <th scope="col" className='th-width-md-'>
                                <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                    <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Nombre</span>
                                </div>
                                </th>
                                <th scope="col" className='th-width-xs-'>
                                <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                    <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Ver</span>
                                </div>
                                </th>
                                <th scope="col" className='th-width-xs-'>
                                <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                    <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Subir</span>
                                </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2' style={{'cursor':'pointer'}} onClick={()=>setModalShow2(true)}>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2' style={{'cursor':'pointer'}}>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <div  className='checks-radios- me-3'>
                                                    <MdAutoDelete size={20} color='#F67697' cursor={'pointer'}></MdAutoDelete>
                                                </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                    <span className='font_medium whiteV2'>Derecho Penal</span>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <IoDocuments size={20} color='white' cursor={'pointer'}></IoDocuments>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle'>
                                                <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                    <div  className='checks-radios- me-3'>
                                                        <FaFileUpload size={20} color='white' cursor={'pointer'}></FaFileUpload>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <CreateCategory  show={modalShow}
            onHide={()=>setModalShow(false)}></CreateCategory>

            <EditCategory  show={modalShow2}
            onHide={()=>setModalShow2(false)}></EditCategory>
        </>
    )
}
