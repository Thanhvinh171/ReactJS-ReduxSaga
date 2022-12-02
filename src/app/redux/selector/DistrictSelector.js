import { createSelector } from "reselect";
import { selectorState } from "./EmployeeSelector";

export const selectorDistrict = createSelector(
    [selectorState],
    (state) => state.district.district
)