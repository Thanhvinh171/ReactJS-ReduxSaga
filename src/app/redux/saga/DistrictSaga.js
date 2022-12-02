import { all, call, put, takeLatest } from "redux-saga/effects";
import { DISTRICT_ACTION_TYPE } from "../types/DistrictType";
import { getAllDistrict } from "../untils/DistrictUntils";

function* watchGetAllDistrict (){
    try {
        const result = yield call(async () => {
            return await getAllDistrict();
        });
        //console.log("abc", result);
        if(result){
            yield put({
                type: DISTRICT_ACTION_TYPE.GET_DISTRICT_SUCCESS,
                payload: result
            });
        }
    } catch (error) {
        yield put({
            type: DISTRICT_ACTION_TYPE.GET_DISTRICT_FAIL,
        })
    }
}

function* actionDistrict(){
    yield all([
        yield takeLatest(
            DISTRICT_ACTION_TYPE.GET_ALL_DISTRICT,
            watchGetAllDistrict
        )
    ])
}

export default actionDistrict;