import { createSelector } from "reselect";
import { selectorState } from "./EmployeeSelector";

export const selectorCommune = createSelector(
    [selectorState],
    (state) => state.commune.commune
)