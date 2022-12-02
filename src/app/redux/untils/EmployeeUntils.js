/* Call API */
import axios from "axios";
import { API_ENPOINT } from "app/appConfig";
export function getAllEmployee(){
    return axios.post(API_ENPOINT + "/employees/search", {}).then((res) => res.data.data);
}
export function deleteEmployee (id) {
    return axios.delete(API_ENPOINT +`/employees/${id}`).then((res) => res.data);
}

export function addEmployee(data){
    return axios.post(API_ENPOINT + "/employees", data).then((res) =>  res.data);
}

export function updateEmployee(data, id){
    return axios.put(API_ENPOINT + `/employees/${id}`, data).then((res) => res.data);
}
