import { API_ENPOINT } from "app/appConfig";
import axios from "axios";

export function getAllDistrict (){
    return axios.post(API_ENPOINT + "/districts/search",{}).then((res) => res.data.data);
}