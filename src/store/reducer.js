import * as actionTypes from "./constant"; // 引入*的话就是一个对象，其下属性即为各导出变量

const initialState = {
  name: "Daxt",
  obj: {
    info: "test",
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_NAME:
      return { ...state, name: action.name };
    case actionTypes.CHANGE_OBJ:
      return { ...state, obj: action.obj };
    default:
      return state;
  }
}

export default reducer;
