import axios from "axios";
import { environment } from "../environments/environments";



const createDocument=async(body)=>{

    let path = environment.serverBackend + environment.createDocument
    return axios.post(path,body)

}

const deleteDocument=async(ID)=>{
    let path = environment.serverBackend + environment.deleteDocument + ID + '/delete/' 
    return axios.delete(path)
}



const getDocuments=async()=>{
    let path =  environment.serverBackend + environment.listDocuments
    return axios.get(path)
}


const processDocuments=async(Id)=>{
    let path =  environment.serverBackend + environment.procesarDocumentos+Id
    return axios.get(path)
}



export {createDocument,deleteDocument,getDocuments,processDocuments}