import { all, call, put, takeLatest } from "redux-saga/effects";
import { PROVINCE_ACTION_TYPE } from "../types/ProvinceType";
import { getAllProvince } from "../untils/ProvinceUntils";

function* watchGetAllProvince(){
    try {
        const result = yield call(async () => {
            return await getAllProvince();
        });
        // console.log("result: ", result)
        if(result){
            yield put({
                type: PROVINCE_ACTION_TYPE.GET_PROVINCE_SUCCESS,
                payload: result          
            });
        }
    } catch (error) {
        yield put({
            type: PROVINCE_ACTION_TYPE.GET_PROVINCE_FAIL,
        })
    }
}

function* actionProvince (){
    yield all([
        yield takeLatest(
            PROVINCE_ACTION_TYPE.GET_ALL_PROVINCE,
            watchGetAllProvince
        )
    ])
}

export default actionProvince;