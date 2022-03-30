const initialState = {
    countryList: [],
    countryAdd: [],
    countryDelete:[],
    countryInfo:{
      name:'',
      code:'',
      status:''
    }
  }
  function COUNTRY_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_COUNTRY':
        return {
          ...state,
          countryList: action.payload.data
        };
      case 'ADD_COUNTRY':
        return {
          ...state,
          countryAdd: action.payload
        };
      case 'DELETE_COUNTRY':
        return {
          ...state,
          countryDelete: action.payload
  
        };
        break;
        case 'VIEW_COUNTRY':
          return {
            ...state,
            countryInfo: action.payload
          };
        case 'EDIT_COUNTRY':
          return {
            ...state,
            editCountry: action.payload
          }
          break;
        case 'UPDATE_COUNTRY':
          return Object.assign({},state,{
            countryInfo : {
              ...state.countryInfo,
              [action.name] : action.value
            }
          })
      default: return state;
    }
  }
  export default COUNTRY_Reducer;
  
  