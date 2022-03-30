const initialState = {
  faqList: [],
  faqAdd: [],
  faqDelete:[],
  faqInfo : {
          question : '',
          answer   : '',
          status   : '',
          id       : ''
      }
}
function FAQ_Reducer(state = initialState, action) {
  console.log("-=-=-=Reducer=-=-=", action)
  switch (action.type) {
    case 'LIST_FAQ':
      return {
        ...state,
        faqList: action.payload.data
      };
    case 'ADD_FAQ':
      return {
        ...state,
        faqAdd: action.payload
      };
    case 'DELETE_FAQ':
      return {
        ...state,
        faqDelete: action.payload
      };
      break;
    case 'VIEW_FAQ':
      return {
        ...state,
        faqInfo: action.payload
      };
    case 'EDIT_FAQ':
      return {
        ...state,
        editFaq: action.payload
      }
      break;
    case 'UPDATE_FAQ':
      return Object.assign({},state,{
        faqInfo : {
          ...state.faqInfo,
          [action.name] : action.value
        }
      })
    default: return state;
  }
}
export default FAQ_Reducer;