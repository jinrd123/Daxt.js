import * as actionTypes from "./constant";

export const changeNameAction = (name) => ({
  type: actionTypes.CHANGE_NAME,
  name,
});

export const changeObjAction = (obj) => ({
  type: actionTypes.CHANGE_OBJ,
  obj,
});
