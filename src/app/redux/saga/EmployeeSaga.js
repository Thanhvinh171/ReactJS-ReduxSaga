import { toast } from "react-toastify";
import {
    all,
    call,
    put,
    takeLatest,
} from "redux-saga/effects";
import { EMPLOYEE_ACTION_TYPE } from "../types/EmployeeType";
import { addEmployee, deleteEmployee, getAllEmployee, updateEmployee } from "../untils/EmployeeUntils";
function* watchGetAllEmployee (){
    try {
        const result = yield call(async () =>
            { return await getAllEmployee();
        });
        if(result){
            yield put({
                type: EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_SUCCESS,
                payload: result,
            });
        }

    } catch (error) {
        yield put({
            type: EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_FAIL
        });
    }
}

function* watchDeleteEmployee (action){
    try {
        const result = yield call(async () => {
            return await deleteEmployee(action.id);
        });
        if(result){
            yield put({
                type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_SUCCESS,
                payload: result,
            });
            yield put({
                type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
            });
        }
    } catch (error) {
        yield put({
            type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_FAIL,
          });
        toast.error("Nhân viên chưa được xóa");
    }
}

function* watchEditorEmployee(action){
    if(!action.id){
        try {
            const result = yield call(async () => {
                return await addEmployee(action.data)
            });
            if(result){
                yield put({
                    type: EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_SUCCESS,
                    payload: result
                });
                yield put({
                    type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
                })
            }
        } catch (error) {
            yield put({
                type: EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_FAIL,
                payload: error.response.message,
            })
        }
    }else{
        //update employee
        try {
            const result = yield call(async () => {
                return await updateEmployee(action.data, action.id);
            });
            //console.log("result", result);
            if(result){
                yield put({
                    type: EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_SUCCESS,
                    payload: result
                });
                yield put({
                    type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
                })
            }
        } catch (error) {
            yield put({
                type: EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_FAIL,
                payload: error.response.message,
            })
        }
    }
}

function* actionEmployee (){
    yield all([
        yield takeLatest(
            EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
            watchGetAllEmployee
        ),
        yield takeLatest(
            EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE,
            watchDeleteEmployee
        ),
        yield takeLatest(
            EMPLOYEE_ACTION_TYPE.EDIT_EMPLOYEE,
            watchEditorEmployee
        )
    ]);
}
export default actionEmployee;
