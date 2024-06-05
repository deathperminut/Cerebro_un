import axios from "axios";
import { environment } from "../environments/environments";



const createCategory=async(name)=>{

    let path = environment.serverBackend + environment.createCategory
    let body = {
        'nombre':name
    }
    return axios.post(path,body)

}

const deleteCategory=async(ID)=>{
    let path = environment.serverBackend + environment.deleteCategory + ID + '/delete/' 
    return axios.delete(path)
}



const getCategories=async()=>{
    let path =  environment.serverBackend + environment.listCategories
    return axios.get(path)
}



export {createCategory,deleteCategory,getCategories}