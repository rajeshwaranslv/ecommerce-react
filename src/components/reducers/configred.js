const initialState = {
  configList: [],
  configAdd: [],
  configDelete: [],
  configInfo: {
    id: "",
    name: "",
    slug: "",
    description: "",
    status: "",
  },
};
function CONFIGURATION_Reducer(state = initialState, action) {
  // console.log("-=-=-=Reducer=-=-=", action)
  switch (action.type) {
    case "LIST_CONFIGURATION":
      return {
        ...state,
        configList: action.payload.data,
      };
      break;
    case "ADD_CONFIGURATION":
      return {
        ...state,
        configAdd: action.payload,
      };
      break;
    case "DELETE_CONFIGURATION":
      return {
        ...state,
        configDelete: action.payload,
      };
      break;
    case "VIEW_CONFIGURATION":
      console.log ("vbksjd")
      return {
        ...state,
        configInfo: action.payload,
      };
      break;
    case "EDIT_CONFIGURATION":
      return {
        ...state,
        editConfig: action.payload,
      };
      break;
    case "UPDATE_CONFIGURATION":
      return Object.assign({}, state, {
        configInfo: {
          ...state.configInfo,
          [action.name]: action.value,
        },
      });
      break;
    default:
      return state;
  }
}
export default CONFIGURATION_Reducer;
