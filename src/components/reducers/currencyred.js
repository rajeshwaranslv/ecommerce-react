const initialState = {
    currencyList: [],
    currencyAdd: [],
    currencyDelete:[],
    currencyInfo:{
      name:'',
      code:'',
      status:''
    }
  }
  function CURRENCY_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_CURRENCY':
        return {
          ...state,
          currencyList: action.payload.data
        };
      case 'ADD_CURRENCY':
        return {
          ...state,
          currencyAdd: action.payload
        };
      case 'DELETE_CURRENCY':
        return {
          ...state,
          currencyDelete: action.payload
        };
        break;
        case 'VIEW_CURRENCY':
          return {
            ...state,
            currencyInfo: action.payload
          };
        case 'EDIT_CURRENCY':
          return {
            ...state,
            editCurrency: action.payload
          }
          break;
        case 'UPDATE_CURRENCY':
          return Object.assign({},state,{
            currencyInfo : {
              ...state.currencyInfo,
              [action.name] : action.value
            }
          })
      default: return state;
    }
  }
  export default CURRENCY_Reducer;
  
  