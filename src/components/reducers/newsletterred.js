const initialState = {
    newsletterList: [],
    newsletterAdd: [],
    newsletterDelete:[],
    newsletterInfo:{
      name:'',
      subject:'',
      template:'',
      status:''
    }
  }
  function NEWSLETTER_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_NEWSLETTER':
        return {
          ...state,
          newsletterList: action.payload
        };
      case 'ADD_NEWSLETTER':
        return {
          ...state,
          newsletterAdd: action.payload
        };
      case 'DELETE_NEWSLETTER':
        return {
          ...state,
          newsletterDelete: action.payload
  
        };
        break;
        case 'VIEW_NEWSLETTER':
          return {
            ...state,
            newsletterInfo: action.payload
          };
        
        case 'UPDATE_NEWSLETTER':
          return Object.assign({},state,{
            newsletterInfo : {
              ...state.newsletterInfo,
              [action.name] : action.value
            }
          })
      default: return state;
    }
  }
  export default NEWSLETTER_Reducer;