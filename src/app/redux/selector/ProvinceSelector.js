import { createSelector } from "reselect";
import { selectorState } from "./EmployeeSelector";

export const selectorProvince = createSelector(
    [selectorState],
    (state) => state.province.province
)