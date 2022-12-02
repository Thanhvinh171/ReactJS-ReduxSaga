import axios from "axios";
import { Log } from "victory";
import ConstantList, { API_ENPOINT } from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/employees/";
export const getAllEmployees = () => {
    var url = API_ENPOINT + "/employees/search"
    return axios.post(url,{});
}

export const getAllCommunes = () =>{
    var url = API_ENPOINT + "/communes"
    return axios.get(url)
}

export const getAllDistricts = () => {
    var url = API_ENPOINT + "/districts/search" 
    return axios.post(url,{})
}


export const getAllProvinces = () => {
    var url = API_ENPOINT + "/provinces/search"
    return axios.post(url,{})
}

export const createNewEmployees = (data) => {
    var url = API_ENPOINT + "/employees"
    return axios.post(url, data)
}

export const deleteEmployees = (id) => {
    var url = API_ENPOINT + `/employees/${id}`
    return axios.delete(url)
}

export const updateEmployees = (id,data) => {
    var url = API_ENPOINT + `/employees/${id}`
    return axios.put(url,data)
}

export const searchDto = (searchObject) => {
    var url = API_ENPOINT + "employees/search";
    return axios.post(url, searchObject)
}

