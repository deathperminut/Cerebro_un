import React from 'react'
import './Files.css'
import NavBar from '../../Components/NavBar/NavBar'
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated';
import CreateCategory from '../../Components/CreateCategory/CreateCategory';
import EditCategory from '../../Components/EditCategory/EditCategory';
import { MdAutoDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FcFile } from "react-icons/fc";
import { AppContext } from '../../Context';
import { IoDocuments } from "react-icons/io5";
import Step_1 from './Components/Step_1/Step_1';
import Step_2 from './Components/Step_2/Step_2';
import Step_3 from './Components/Step_3/Step_3';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdOutlineDeleteOutline } from "react-icons/md";

import { createCategory,deleteCategory,getCategories } from '../../Chat_backend_services/Categorias';
import Preloader from '../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import { createDocument, deleteDocument, getDocuments , processDocuments } from '../../Chat_backend_services/Documentos';


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

    /* AppContext */
    let {categories,setCategories,documents,setDocuments,selectCategory,setSelectCategory} = React.useContext(AppContext);
    
    /* useStates */

    let [newCat,setNewCat] = React.useState("");
    let [seeFiles,setSeeFiles] = React.useState([]);
    const [state,setState] = React.useState('1');
    let [preloader,setPreloader] = React.useState(false);
    let [selectCat,setSelectCat] = React.useState(null);
    let [uploadFiles,setUploadFiles] = React.useState(null);

    // modal useState
    const [modalShow,setModalShow] = React.useState(false);
    const [modalShow2,setModalShow2] = React.useState(false);


    const [show3, setShow3] = React.useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [show4, setShow4] = React.useState(false);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    
    /* functions */

    const loadCategories=async()=>{

        let result  = undefined
        setPreloader(true);
        result =  await getCategories().catch((error)=>{
          setPreloader(false);
          console.log(error);
          Swal.fire({
            icon: 'info',
            title: 'Problemas al cargar datos'
          });
        })
 
        if(result){
           setPreloader(false);
           console.log("CATEGORIAS: ",result.data);
           setCategories(result.data);
        }
 
     }

     const DeleteCategory=async(Id)=>{

        let result  = undefined
        setPreloader(true);
        result =  await deleteCategory(Id).catch((error)=>{
          setPreloader(false);
          console.log(error);
          Swal.fire({
            icon: 'info',
            title: 'Problemas para eliminar categoria'
          });
        })
 
        if(result){
           setPreloader(false);
           Swal.fire({
            icon: 'success',
            title: 'Categoria eliminada correctamente'
           });
           loadCategories();
        }
 
     }


     const DeleteDocument=async(Id)=>{

        let result  = undefined
        setPreloader(true);
        result =  await deleteDocument(Id).catch((error)=>{
            setPreloader(false);
            console.log(error);
            Swal.fire({
                icon: 'info',
                title: 'Problemas para eliminar documento'
            });
        })
 
        if(result){
            setPreloader(false);
            Swal.fire({
                icon: 'success',
                title: 'Documento eliminado correctamente'
            });
            loadDocuments();
            handleClose3();
            
        }
 
     }
 
 
     const loadDocuments=async()=>{
 
       let result  = undefined
       setPreloader(true);
       result =  await getDocuments().catch((error)=>{
         setPreloader(false);
         console.log(error);
         Swal.fire({
           icon: 'info',
           title: 'Problemas al cargar datos'
         });
         
       })
 
       if(result){
         setPreloader(false);
         console.log("Documentos: ",result.data);
         let productos = result.data
         const productosPorCategoria = productos.reduce((agrupado, producto) => {
           const categoria = producto.categoria;
           if (!agrupado[categoria]) {
             agrupado[categoria] = [];
           }
           agrupado[categoria].push(producto);
           return agrupado;
         }, {});
         
         console.log("AGRUPADOS: ",productosPorCategoria);
         setDocuments(productosPorCategoria);
       }
 
    }
    
    const  GenerateCategory=async()=>{
        
        if(newCat == ""){
            Swal.fire({
                icon: 'info',
                title: 'Debes registrar un nombre para la categoria'
            });
        }else{

            let result  = undefined
            setPreloader(true);
            result =  await createCategory(newCat).catch((error)=>{
                setPreloader(false);
                console.log(error);
                setNewCat("");
                setModalShow(false);
                Swal.fire({
                icon: 'info',
                title: 'Problemas al crear la categoria'
                });
                
            })
        
            if(result){
                setPreloader(false);
                console.log("CATEGORIA CREADA: ",result.data);
                // volvemos a cargar los datos de la categoria
                setNewCat("");
                setModalShow(false);
                loadCategories();
                Swal.fire({
                    icon: 'success',
                    title: 'Categoria creada con éxito'
                });
            }

        }
    }

    const processFiles=async()=>{

        for (var i=0;i<uploadFiles.length;i++){
            // iteramos para procesar cada archivos
            let body=new FormData();
            body.append('categoria',selectCat);
            body.append('nombre',uploadFiles[i].name);
            body.append('archivo',uploadFiles[i]);
            body.append('descripcion','Archivo');
            let result = undefined;
            result =  await createDocument(body).catch((error)=>{
                console.log(error);
                Swal.fire({
                    icon: 'info',
                    title: 'Problemas para procesar archivos'
                });
                setState('2');
            })
            if(result){
                console.log("ARCHIVO : ",result.data);
            }

        }

        // FINALIZAMOS CON PROCESAR LA CATEGORIA
        let result2 =  undefined;
        result2 = await processDocuments(selectCat).catch((error)=>{
            console.log(error);
            setState('2');
            Swal.fire({
                icon: 'info',
                title: 'Problemas para procesar archivos'
            });
        });

        if(result2){
            console.log("EXITOS : ",result2)
            setUploadFiles([]);
            setState('1');
            loadDocuments();
            handleClose4();
            Swal.fire({
                icon: 'success',
                title: 'Archivos procesados correctamente'
            });
        }

    }




    return (
        <> 
            {preloader ? 
            <Preloader></Preloader>
            :
            <></>
            }
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
                                        {categories.map((obj,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td className='align-middle'>
                                                        <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                        <div  className='checks-radios- me-3'>
                                                            <MdAutoDelete size={20} color='#F67697' cursor={'pointer'} onClick={()=>DeleteCategory(obj?.id)}></MdAutoDelete>
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <div id='internal-form' className='w-100' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                                                            <span className='font_medium whiteV2'  >{obj?.nombre}</span>
                                                        </div>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                            <div  className='checks-radios- me-3'>
                                                                <IoDocuments size={20} color='white' cursor={'pointer'} onClick={()=>{
                                                                // miramos si la llave del id existe
                                                                let lista_llaves = Object.keys(documents)
                                                                console.log("LLAVES : ",lista_llaves,obj.id,obj.id.toString(),documents);
                                                                let lista = lista_llaves.filter((d)=> d === obj.id.toString())
                                                                console.log("lista final: ",lista);
                                                                if(lista.length !==0){
                                                                        console.log("Documentos a mostrar: ",documents[obj?.id])
                                                                        setSeeFiles(documents[obj?.id]);
                                                                        handleShow3();
                                                                }else{
                                                                    Swal.fire({
                                                                        icon: 'info',
                                                                        title: 'No hay documentos asociados a la categoria'
                                                                    });
                                                                }
                                                                
                                                                }}></IoDocuments>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <div className='w-auto d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                            <div  className='checks-radios- me-3'>
                                                                <FaFileUpload size={20} color='white' cursor={'pointer'} onClick={()=>{
                                                                setSelectCat(obj?.id);
                                                                handleShow4();
                                                                }}></FaFileUpload>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* MODALS CRUD CATEGORIES */}
            <CreateCategory  show={modalShow}
            onHide={()=>setModalShow(false)} name={newCat} editName={(name)=>setNewCat(name)} create = {GenerateCategory}></CreateCategory>

            <EditCategory  show={modalShow2}
            onHide={()=>setModalShow2(false)}></EditCategory>
            {/* OFF CANVAS CRUD FILES */}

            <Offcanvas className="offcanvasBodyV2" show={show3} onHide={handleClose3}>
                <Offcanvas.Header closeButton className='offcanvas-header pb-4 padding-40-'>
                    <h2 className='m-0 p-0 lh-sm fs-3- ff-monse-regular- fw-bold tx-dark-purple- font_medium' style={{'color':'#FFF'}}>Documentos</h2>
                    <button onClick={handleClose3} id='buttonClose' type="button"
                        className='btn-close-offcanvas'
                        style={{'display':'flex',alignItems:'center','justifyContent':'center'}}
                        data-bs-dismiss="offcanvas">
                        <IoIosClose size={30} className='fa icon-close'></IoIosClose>
                    </button>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='offcanvas-body' style={{'width':'100%','display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
                        <div className='descriptionFiles'>
                                <p className='whiteV2 font_medium' style={{'textAlign':'center'}}>Aqui podras ver todos los documentos asociados a la categoria especifica que ya fueron procesados.</p>
                        </div>
                        <div className='FilesContainer flex-wrap overflow-y' style={{'marginTop':'40px','padding':'20px','display':'flex','flexDirection':'row'}}>
                                    {seeFiles.map((obj,index)=>{
                                        return(
                                            <div key={index} className='row row-cols-auto d-flex flex-wrap justify-content-center align-items-start align-self-start justify-content-sm-center align-items-sm-start align-self-sm-start justify-content-md-center align-items-md-start align-self-md-start justify-content-lg-start align-items-lg-start align-self-lg-start justify-content-xl-start align-items-xl-start align-self-xl-start justify-content-xxl-start align-items-xxl-start align-self-xxl-start g-4 ps-2 pe-2'>
                                                <div className='col d-flex flex-column justify-content-center align-items-center align-self-start wrapper-card-file-'>
                                                    <div style={{'marginBottom':'20px'}}  id="card-file" className='w-100 d-flex flex-row justify-content-center align-items-center align-self-center cursor- focus background-linear-1'>
                                                    <div className='card overflow-out border-0 position-relative  bs-1-'>
                                                        <div className='notiDiv deleteButton'>
                                                        <span className='font_medium' style={{'cursor':'pointer'}} onClick={()=>{
                                                            DeleteDocument(obj?.id)
                                                        }} >X</span>
                                                        </div>
                                                        <div onClick={()=>{window.open(obj?.archivo)}}  className='w-100 h-100 d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                        <FcFile size={60} color={'#fff'}></FcFile>
                                                        </div>
                                                        <span className='font_medium numberInform'>{'1'}</span>
                                                    </div>
                                                    </div>
                                                    <div  className='w-auto mt-3 name_container' style={{'width':'100px'}}>
                                                    <p className='m-0 p-0 lh-sm fs-6-  fw-normal text-center  font_medium name_container' style={{'width':'100px',fontSize:'12px'}} data-bs-toggle="modal" data-bs-target="#edit-folder" >{obj?.nombre}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    
                        </div>
                    </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas className="offcanvasBodyV2" show={show4} onHide={handleClose4}>
                <Offcanvas.Header closeButton className='offcanvas-header pb-4 padding-40-'>
                    <h2 className='m-0 p-0 lh-sm fs-3- ff-monse-regular- fw-bold tx-dark-purple- font_medium' style={{'color':'#FFF'}}>Procesar documentos</h2>
                    {state !== '3' ? 
                    
                    <></>
                    :

                    <button onClick={()=>{
                        setUploadFiles([]);
                        setState('1');
                        handleClose4();
                    }} id='buttonClose' type="button"
                        className='btn-close-offcanvas'
                        style={{'display':'flex',alignItems:'center','justifyContent':'center'}}
                        data-bs-dismiss="offcanvas">
                        <IoIosClose size={30} className='fa icon-close'></IoIosClose>
                    </button>

                    }
                    
                    </Offcanvas.Header>
                    <Offcanvas.Body className='offcanvas-body' style={{'width':'100%','display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
                        <div className='descriptionFiles'>
                                <p className='whiteV2 font_medium' style={{'textAlign':'center'}}>Aqui podras subir nuevos documentos a la respectiva categoria</p>
                        </div>
                        {state == '3'  ? 
                        <ProgressBar style={{'width':'80%','maxWidth':'1000px','marginTop':'20px'}} animated now={100}  label={'Procesando...'}/> 
                        :
                        <></>
                        }
                        <div className='FilesContainer flex-wrap overflow-y' style={{'marginTop':'40px','padding':'20px','display':'flex','flexDirection':'row'}}>
                                    {state == '1' ? 
                                    <Step_1 next_step={()=>setState('2')}  saveFiles={(files)=>setUploadFiles(files)}>

                                    </Step_1>
                                    :
                                    <></>
                                    }

                                    {state == '2' || state == '3' ? 
                                    <Step_2 saveFiles={uploadFiles} updateFiles={setUploadFiles} previous_step={()=>{setState('1')}} next_step={()=>setState('3')} state={state}
                                    ></Step_2>
                                    :
                                    <></>
                                    }

                                    
                        </div>
                        {state == '3' ? 
                        <></>
                        :
                        <div className='divsContainer'>
                            <div className='buttonElement' onClick={()=>{
                                if(state == '1'){
                                    setState('2')
                                }else if(state=="2"){
                                    // Proccess files
                                    setState('3');
                                    processFiles();
                                    
                                }
                            }}>
                                <span className='white font_Light'>Siguiente</span>
                            </div>
                        </div>
                        }
                        
                    </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
