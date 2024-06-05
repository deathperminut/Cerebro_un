import { configuraciones } from "../AppConfig";
let server = configuraciones.server;
let serverAirflow = configuraciones.serverAirflow;
let serverChat =  configuraciones.serverChat;
let  serverBackend =  configuraciones.serverBackend;
export const environment = {
    production:false,
    // API
    api:server,
    
    // SERVICIOS
    login:'Login',
    completeLogin:'Authorization_code',
    UserData:'getuserData',
    verifyFolders:'verifyFolders',
    getFiles:'getFiles',
    sendFile:'sendFile',
    getRoutes:'getRoutes',
    getInforms:'getInforms',
    getRetro:'getRetro',
    getRetroPotencials:'getRetroPotencials',
    getCoordenates:'getCoordenates',
    // airflow API

    apiAirflow:serverAirflow,

    // SERVICIOS
    uploadFiles:'uploadFiles',
    verify:'verify',

    // Chat
    apiChat:serverChat,

    // SERVICIOS
    loadChats:'all_chats',
    getChats:'information_chat',
    createChat:'create_chat',
    'chat':'chat',
    'deleteChat':'delete_chat',

    // SERVER BACKEND

    'serverBackend':serverBackend,
    'deleteCategory':'core/categoria/',
    'createCategory':'core/categoria/create/',
    'listCategories':'core/categorias/',

    'listDocuments':'core/documentos/',
    'createDocument':'core/upload/',
    'deleteDocument':'core/documento/',
    'procesarDocumentos':'core/process/?categories=',

}