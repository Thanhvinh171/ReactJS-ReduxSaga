import { all } from "redux-saga/effects";
import actionCommune from "./saga/CommuneSaga";
import actionDistrict from "./saga/DistrictSaga";
import actionEmployee from "./saga/EmployeeSaga";
import actionProvince from "./saga/ProvinceSaga";
const allAction = [
    actionEmployee(),
    actionCommune(),
    actionProvince(),
    actionDistrict(),
]
function* rootSaga (){
    yield all(allAction);
}
export default rootSaga; 