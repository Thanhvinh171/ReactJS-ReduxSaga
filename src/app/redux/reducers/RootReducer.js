import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import { employeeReducer } from "./EmployeeReducer";
import { communeReducer } from "./CommuneReducer";
import { provinceReducer } from "./ProvinceReducer";
import { districtReducer } from "./DistrictReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  employee: employeeReducer, 
  commune: communeReducer,
  province: provinceReducer,
  district: districtReducer
});

export default RootReducer;

