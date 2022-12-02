
import { all, takeLatest, put } from "redux-saga/effects";
import { COMMUNE_ACTION_TYPE } from "../types/CommuneType";
import { getAllComune } from "../untils/CommuneUntils";
import { call} from "redux-saga/effects";

function* watchGetAllCommune (){
    try {
        const result = yield call(async () => {
            return await getAllComune();
        });
        if(result){
            yield put({
                type: COMMUNE_ACTION_TYPE.GET_COMMUNE_SUCCESS,
                payload: result
            })
        }
    } catch (error) {
        yield put({
            type: COMMUNE_ACTION_TYPE.GET_COMMUNE_FAIL,
        })
    }
}

function* actionCommune(){
    yield all([
        yield takeLatest(
            COMMUNE_ACTION_TYPE.GET_ALL_COMMUNE,
            watchGetAllCommune
        )
    ])
}
export default actionCommune;