import axios from "axios";
import { environment } from "../environments/environments";


const loadChatHistorial=async()=>{

    let path = environment.apiChat + environment.loadChats
    let body = {
        'numero_chats':'1'
    }
    return axios.post(path,body)

}

const getConversations=async(body)=>{
    let path = environment.apiChat + environment.getChats

    return axios.post(path,body)
}

const createConversation=async()=>{
    let path =  environment.apiChat + environment.createChat

    return axios.post(path,{})
}

const getAnswer=async(body)=>{

    let path = environment.apiChat +  environment.chat

    return axios.post(path,body)

}

const deleteChat=async(body)=>{
    let path =  environment.apiChat + environment.deleteChat

    return axios.post(path,body)
}


export {loadChatHistorial,getConversations,createConversation,getAnswer,deleteChat}