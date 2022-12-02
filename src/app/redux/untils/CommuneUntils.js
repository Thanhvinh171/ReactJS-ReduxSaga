import { API_ENPOINT } from "app/appConfig";
import axios from "axios";

export function getAllComune(){
    return axios.get(API_ENPOINT + "/communes").then((res) => res.data.data)
}