const initialState = {
    paymentList: [],
    paymentAdd: [],
    paymentDelete:[],
    paymentInfo:{
      name:'',
      mode:'',
      status:''
    }
  }
  function PAYMENT_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_PAYMENT':
        return {
          ...state,
          paymentList: action.payload.data
        };
      case 'ADD_PAYMENT':
        return {
          ...state,
          paymentAdd: action.payload
        };
      case 'DELETE_PAYMENT':
        return {
          ...state,
          paymentDelete: action.payload
  
        };
        break;
        case 'VIEW_PAYMENT':
          return {
            ...state,
            paymentInfo: action.payload
          };
        case 'UPDATE_PAYMENT':
          return Object.assign({},state,{
            paymentInfo : {
              ...state.paymentInfo,
              [action.name] : action.value
            }
          })
      default: return state;
    }
  }
  export default PAYMENT_Reducer;
  
  