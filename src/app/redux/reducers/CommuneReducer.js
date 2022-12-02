import { COMMUNE_ACTION_TYPE } from "../types/CommuneType";

const INIT_STATE = {
    isError: false,
    commune: [],
};
export const communeReducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case COMMUNE_ACTION_TYPE.GET_COMMUNE_SUCCESS:
            return{
                ...state,
                commune: action.payload
            };
        case COMMUNE_ACTION_TYPE.GET_COMMUNE_FAIL:
            return{
                ...state,
                isError: true,
            };
        default:
            return state;
    }
}