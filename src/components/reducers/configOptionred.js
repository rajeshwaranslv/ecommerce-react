const initialState = {

    configOptionList: [],
    configOptionAdd: [],
    configOptionDelete:[],
    configOptionEdit:[], 
    configOptionInfo:{
      name:'',
      slug:'',
      sort:'',
      description:'',
      status:'',
      id:''
    }
  }
  function CONFIGURATION_Option_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_CONFIGURATION_OPTION':
        return {
          ...state,
          configOptionList: action.payload.data
        };
      case 'ADD_CONFIGURATION_OPTION':
        return {
          ...state,
          configOptionAdd: action.payload
        };
      case 'DELETE_CONFIGURATION_OPTION':
        return {
          ...state,
          configOptionDelete: action.payload
  
        };
        break;
        case 'VIEW_CONFIGURATION_OPTION':
          return {
            ...state,
            configOptionInfo: action.payload
          };
        case 'EDIT_CONFIGURATION_OPTION':
          return {
            ...state,
            configOptionEdit: action.payload
          }
          break;
        case 'UPDATE_CONFIGURATION_OPTION':
          return Object.assign({},state,{
            configInfo : {
              ...state.configInfo,
              [action.name] : action.value
            }
          })
      default: return state;
    }
  }
  export default CONFIGURATION_Option_Reducer;