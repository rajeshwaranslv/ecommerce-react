const initialState = {
    userList: [],
    userAdd: [],
    userDelete:[],
    userInfo:{
      name:'',
      email:'',
      mobile:'',
      password:''
    }
  }
  function USER_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_USER':
        return {
          ...state,
          userList: action.payload.data
        };
        case 'VIEW_USER':
          return {
            ...state,
            userInfo: action.payload
          };
      default: return state;
    }
  }
  export default USER_Reducer;
  
  