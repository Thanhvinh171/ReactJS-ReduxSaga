import { createSelector } from "reselect";
export const selectorState = (state) => state;
export const selectorEmployee = createSelector(
  [selectorState],
  (state) => state.employee.employee
);

export const selectorSetStatusEmployee = createSelector(
  [selectorState],
  (state) => state.employee.employeeData
);

