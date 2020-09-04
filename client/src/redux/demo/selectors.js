import { createSelector } from "reselect";

export const getDataDemo = createSelector(
    (state) => state.demo.data,
    data => data
);