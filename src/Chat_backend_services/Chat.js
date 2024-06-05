import axios from "axios";
import { environment } from "../environments/environments";



const processConversation=async(body)=>{

    let path = environment.serverBackend + environment.procesarQuery
    return axios.post(path,body)

}



export {processConversation}