
import { toast } from "react-toastify";
import { EMPLOYEE_ACTION_TYPE } from "../types/EmployeeType";
const INIT_STATE = {
    isError: false,
    employee: [],
    deleteSuccess:"",
    addSuccess: "",
    updateSuccess:"",
    employeeData: {}
};

export const employeeReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_SUCCESS:
            return{
                ...state,
                employee: action.payload,
                employeeData: {}
            };
        case EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_FAIL:
            return{
                ...state,
                isError: true,
            };
        case EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_SUCCESS:
            if (action.payload.code == 200) {
                toast.success(`Xóa ${action.payload.message}`);
            }
            return{
                ...state,
                deleteSuccess: action.payload.message
            };
        case EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_FAIL:
            return{
                ...state,
                isError: false,
            }  
        case EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_SUCCESS:
            if (action.payload.code == 200) {
                toast.success(`Thêm ${action.payload.message}`);      
            }else{
                toast.error(action.payload.message); 
            }
            return{
                ...state,
                employeeData: action.payload,
            }
        case EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_FAIL:
            return{
                ...state,
                isError: true
            }
        case EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_SUCCESS:
            if (action.payload.code == 200) {
                toast.success(`Cập nhật ${action.payload.message}`);
            }else{
                toast.error(action.payload.message);
            }
            return{
                ...state,
                employeeData: action.payload,
            }
        case EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_FAIL:
            return{
                ...state,
                isError: true
            }
        default:
            return state;
    }
}