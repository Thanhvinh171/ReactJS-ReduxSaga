import { PROVINCE_ACTION_TYPE } from "../types/ProvinceType";

const INIT_STATE = {
    isError: false,
    province: [],
};

export const provinceReducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case PROVINCE_ACTION_TYPE.GET_PROVINCE_SUCCESS:
            return{
                ...state,
                province: action.payload
            }
        case PROVINCE_ACTION_TYPE.GET_PROVINCE_FAIL:
            return{
                ...state,
                isError: true
            }
        default:
            return state;
    }
}

