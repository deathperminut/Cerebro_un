import React from 'react'
import './Chat.css'
import IconClouds from '../../assets/images/Clouds_Chat.png'
import PhotoMaleDoctor from '../../assets/images/cerebro_.png'
import "react-chat-elements/dist/main.css"
import { ChatList, Avatar, Navbar, MessageList, Input, Button } from "react-chat-elements"
import $ from 'jquery';
import { IoIosClose } from "react-icons/io";
import ModalSelect from '../../Components/ModalSelect/ModalSelect'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Preloader from '../../Components/Loading/Loading'
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2'
import { getConversations, loadChatHistorial ,createConversation,getAnswer, deleteChat } from '../../chat_services/chat_services'
import NavBar from '../../Components/NavBar/NavBar'
import { processConversation } from '../../Chat_backend_services/Chat'
import PdfComp from '../PdfComp/PdfComp'

export default function Chat() {

  let [preloader,setPreloader] = React.useState(false);
  let [statusBrain,setStatusBrain] = React.useState('Online');
  const inputReferance = React.createRef();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const dayOfMonth = date.getDate();
      const monthOfYear = monthsOfYear[date.getMonth()];
      const year = date.getFullYear();
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const second = date.getSeconds().toString().padStart(2, '0');
      const time = hour + ":" + minute + ":" + second;

      $('.dayOfWeek').text(dayOfWeek);
      $('.dayOfMonth').text(dayOfMonth);
      $('.monthOfYear').text(monthOfYear);
      $('.year').text(year);
      $('.hour').text(time);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* CARGO EL HISTORIAL DE CHATS */

  // React.useEffect(()=>{

  //   // CARGAMOS EL HISTORIAL

  //   loadHistorial();

  // },[])

  let [chatHistory,setChatHistory] = React.useState([]);
  let [chatSelect,setChatSelect] = React.useState(false);
  let [idChat,setIdChat] = React.useState(null);
  let [conversation,setConversation] = React.useState([]);
  let [newChat,setNewChat] = React.useState(false);
  let [Area,setArea] = React.useState('');
  // modal useState
  const [modalShow,setModalShow] = React.useState(false);




  const OrganizeChats=(listChats)=>{

      let lista = listChats.map((element)=>{
        return {
            avatar: require("../../assets/images/cerebro.png"),
            alt: 'Cerebro UN',
            title: 'Cerebro UN',
            subtitle: element[1],
            id:element[0]
          }
        
      })
      return lista
  }


  const getNewChat=()=>{
    setModalShow(true);
    //setNewChat(true);
    //setChatSelect(true);
    //setConversation([]);

  }



  const OrganizeConversation=(information_chat)=>{


    let lista_conversacion = [];
    for (let i=0;i<information_chat.length;i++){
      // iteramos por cada par y lo llevamos a la estructura deseada
      lista_conversacion.push({
        position:"right",
        type:"text",
                    // avatar: require("../../assets/images/Female_User.png"),
        text:information_chat[i][0],
      })

      lista_conversacion.push({
        position:"left",
        type:"text",
        avatar: require("../../assets/images/cerebro_.png"),
        title:"Cerebro",
        text:information_chat[i][1],
      })
    }

    return lista_conversacion

  }

  // create chat
  const appendConversation=(conv)=>{
    let lista_copia = [...conversation];
    lista_copia.push({
      position:"right",
      type:"text",
                  // avatar: require("../../assets/images/Female_User.png"),
      text:conv,
    })
    setConversation(lista_copia);
    scrollToBottom()
    return lista_copia;
  }


  const appendConversation2=(conv,lista)=>{
    console.log("Conversación: ",conversation);
    lista.push({
      position:"left",
      type:"text",
      title:"Cerebro",
      avatar: require("../../assets/images/cerebro_.png"),
      text:conv.result,
      pdfs:conv.source_documents
    })
    setConversation(lista);
    scrollToBottom()
  }




  const chatear=async()=>{


    if (inputReferance.current.value !== '') {
    
      let conv = inputReferance.current.value
      inputReferance.current.value = ""
      //   // observamos si el chat es nuevo
      // // agregamos el chat nuestro a la conversación
      let lista = appendConversation(conv);
      sendMessage(Area,conv,lista)

      }else{
        Swal.fire({
          icon: 'info',
          title: 'Escribe algo dentro del campo de texto para realizar empezar una conversación'
        });
      }
    

  }


  function scrollToBottom() {
    // var container = document.getElementById("ChatContainer");
    // container.scrollTop = container.scrollHeight - container.clientHeight+10000;
  }




  const sendMessage=async(idChat,conv,lista)=>{

      let result =  undefined;
      setStatusBrain('Escribiendo...');
      result =  await processConversation({'category':idChat,'query':conv}).catch((error)=>{
          console.log(error);
          setStatusBrain('Online');
          Swal.fire({
            icon: 'info',
            title: 'Problemas para generar conversación'
          });
        })

      if(result){
          setStatusBrain('Online');
          console.log("resultados chat: ",result.data);
          appendConversation2(result.data.response,lista)
      }

  }

  /* OFF CANVAS PDF */
  const [show2, setShow2] = React.useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  let [documentos,setDocumentos] = React.useState([]);

  const DataPdf=(Message)=>{

    console.log("MENSAJE: ",Message);
    setDocumentos(Message?.pdfs)
    handleShow2();


  }





  



  return (
    <React.Fragment>
      {preloader  ? <Preloader></Preloader> : <></>}
      <NavBar></NavBar>
      <div className='container-fluid overflow-x-hidden' style={{'minHeight':'100vh'}}>
        <div className='row row-cols-auto gx-2 gy-0 d-flex flex-wrap mt-4 mt-- chat' style={{'minHeight':'90vh'}}>
          <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4  d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block chat1'>
            <div className='card border-0 rounded-3 w-100 h-100 bg-transparent- chat2'>
              <div className="card-header bg-transparent- border-0 ps-0 pe-0">
                <h2 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- font_medium blue__' style={{'display':'flex','alignItems':'center','justifyContent':'center'}}></h2>
                <div className='divsContainer'>
                                          <div className='buttonElement' onClick={getNewChat}>
                                              <span className='white font_Light'>Nuevo chat</span>
                                          </div>
                </div>
              </div>
              <div className='card-body w-100 ps-0 pe-0 wrapper-list-chats-'>
                
                {/* <ChatList
                  className='chat-list'
                  dataSource={chatHistory} 
                  onClick={oldChatAccess}
                /> */}
              </div>
            </div>
          </div>
          <div className='col-12 mb-4 d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none'>
          <div className='divsContainer'>
                                          <div className='buttonElement' onClick={getNewChat}>
                                              <span className='white font_Light'>Nuevo chat</span>
                                          </div>
                </div>
          </div>
          {chatSelect ? 
          
          <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 flex-grow-1'>
          <div className='card border-0 rounded-3 w-100 h-100 position-relative bg-chats-'>
            <div className='w-100 d-flex flex-column justify-content-center align-items-center align-self-center position-absolute top-50 start-50 translate-middle d-none'>
              <img className='cloud-chat-' src={IconClouds} alt=""  />
              <div className='w-auto mt-2'>
                <p className='m-0 mb-1 p-0 lh-sm fs-4- ff-monse-regular- fw-bold text-center tx-dark-gray- font_medium'>Bienvenido a cerebro</p>
                <p className='m-0 p-0  lh-sm fs-5- ff-monse-regular- fw-normal text-center tx-light-black-'>Envía y recibe mensajes para obtener información relacionada a efigas</p> 
              </div>
            </div>
            <div className="card-header bg-transparent- border-0 d-flex flex-row justify-content-start align-items-center align-self-center w-100">
              <Navbar
                left={
                  <div className='d-flex flex-row justify-content-start align-items-center align-self-center pd-0' style={{'color':'white','backgroundColor':'rgb(62, 62, 62)','border':'none'}}>
                    <Avatar
                      src={PhotoMaleDoctor}
                      alt={"logo"}
                      size="large"
                      type="circle flexible"
                    />
                    <div className='d-flex flex-column'>
                      <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-bold tx-black-' style={{ alignSelf: "start" }}> Cerebro </p>
                      <p className='m-0 lh-sm fs-6- ff-monse-regular- fw-normal tx-black-' style={{ alignSelf: "start" }}>{statusBrain}</p>
                    </div>
                    {newChat==false ? 
                    <></>
                    :
                    <></>
                    }
                    
                  </div>
                }
              />
            </div>
            <div className='card-body w-100 wrapper-chat-' id='ChatContainer'> 
              <MessageList
                className='message-list'
                lockable={true}
                downButton={true}
                onDownButtonClick={() => {
                  console.log("======onDownButtonClick====");
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "auto"
                  });
                }}
                onTitleClick={(message)=>DataPdf(message)}
                toBottomHeight={'100%'}
                dataSource={conversation}
              />
            </div>
            <div className='card-footer bg-transparent- border-0' style={{'marginTop':''}}>
                {statusBrain == 'Escribiendo...' ? 
                <></>
                :
                <Input
                  placeholder="Escribe un mensaje aquí"
                  multiline={true}
                  onKeyPress={(event)=>{
                    if (event.key === 'Enter') {
                      // Aquí puedes realizar la acción que desees cuando se presione "Enter"
                      chatear();
                    }
                  }}
                  referance={inputReferance}
                  rightButtons={
                    <Button className='send-button-' onClick={chatear} text="Enviar" />
                  }
                />
                }
            </div>
          </div>
          </div>
          :
          <div className='braincontainer' style={{'minWidth':'66%'}}>
              <div className='card border-0 rounded-3  h-100 position-relative bg-light-gray- bs-2- chat1'>
                <div className='d-flex flex-column justify-content-center align-items-center align-self-center position-absolute top-50 start-50 translate-middle'>
                  <img className='cloud-chat-' src={PhotoMaleDoctor} alt="" />
                  <div className='w-auto mt-2'>
                    <p className='m-0 mb-1 p-0 lh-sm fs-4- ff-monse-regular- fw-bold text-center tx-dark-gray- font_medium white'>Bienvenido a cerebro</p>
                    <p className='m-0 p-0  lh-sm fs-5- ff-monse-regular- fw-normal text-center tx-light-black- whiteV2'>Envía y recibe mensajes con respecto a la información que necesites de la institución</p> 
                  </div>
                </div>
                <div className="card-header bg-transparent- border-0 d-flex flex-row justify-content-start align-items-center align-self-center w-100 ps-2 pe-2">                  
                </div>
                <div className='card-body w-100 wrapper-chat- ps-2 pe-2'></div>
              </div>
          </div>
          }
          
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} className='offcanvas offcanvas-start' tabIndex="-1" data-bs-backdrop="false" id="chats-preview"
        aria-labelledby="offcanvasTopLabel" data-bs-scroll="false">
        <Offcanvas.Header closeButton className='offcanvas-header pb-4 padding-40-'>
          <h2 className='m-0 p-0 lh-sm fs-3- ff-monse-regular- fw-bold tx-dark-purple- font_medium color-green'>Chats</h2>
          <button onClick={handleClose} id='buttonClose' type="button"
            className='btn-close-offcanvas'
            style={{'display':'flex',alignItems:'center','justifyContent':'center'}}
            data-bs-dismiss="offcanvas">
            <IoIosClose size={30} className='fa icon-close'></IoIosClose>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className='offcanvas-body'>
          <div className='container-fluid pt-0 pb-0 padding-40-'>
                <div className='divsContainer'>
                    <div className='buttonElement' onClick={()=>{
                      getNewChat();
                      document.getElementById('buttonClose').click();
                      }}>
                        <span className='white font_Light'>Nuevo chat</span>
                    </div>
                </div>
                {/* <ChatList
                  className='chat-list'
                  dataSource={chatHistory} 
                  onClick={(event)=>{
                      oldChatAccess(event);
                      document.getElementById('buttonClose').click();
                  }}
                /> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ModalSelect
            show={modalShow}
            selectArea={
              (event)=>{
                if(event){
                  // seteamos el area
                  setArea(event.value);
                  // vamos a la visión del chat
                  setNewChat(true);
                  setChatSelect(true);
                  setConversation([]);
                  // cerramos el modal
                  setModalShow(false);
                }
              }
            }
            onHide={()=>setModalShow(false)}>
      </ModalSelect>
      <Offcanvas className="offcanvasBodyV2" show={show2} onHide={handleClose2}>
          <Offcanvas.Header closeButton className='offcanvas-header pb-4 padding-40-'>
              <h2 className='m-0 p-0 lh-sm fs-3- ff-monse-regular- fw-bold tx-dark-purple- font_medium blue__'>Pdf</h2>
              <button onClick={handleClose2} id='buttonClose' type="button"
                className='btn-close-offcanvas'
                style={{'display':'flex',alignItems:'center','justifyContent':'center'}}
                data-bs-dismiss="offcanvas">
                <IoIosClose size={30} className='fa icon-close'></IoIosClose>
              </button>
            </Offcanvas.Header>
            <Offcanvas.Body className='offcanvas-body' style={{'width':'100%','display':'flex','justifyContent':'center'}}>
                <PdfComp documentos = {documentos}></PdfComp>
            </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  )
}
