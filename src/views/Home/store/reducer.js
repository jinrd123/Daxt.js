import { CHANGE_HOME_LIST } from "./constants";

const defaultState = {
  data: "home data",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_HOME_LIST:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
