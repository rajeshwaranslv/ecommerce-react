// const initialState = {
//     languageList: [],
//     languageAdd: [],
//     languageDelete:[],
//     languageInfo : {
//             name : '',
//             code   : '',
//             status   : '',
//             id       : ''
//         }
//   }
//   function LANGUAGE_Reducer(state = initialState, action) {
//     console.log("-=-=-=Reducer=-=-=", action)
//     switch (action.type) {
//       case 'LIST_LANGUAGE':
//         return {
//           ...state,
//           languageList: action.payload.data
//         };
//       case 'ADD_LANGUAGE':
//         return {
//           ...state,
//           languageAdd: action.payload
//         };
//       case 'DELETE_LANGUAGE':
//         return {
//           ...state,
//           languageDelete: action.payload
//         };
//         break;
//       case 'VIEW_LANGUAGE':
//         return {
//           ...state,
//           languageInfo: action.payload
//         };
//       case 'UPDATE_LANGUAGE':
//         return Object.assign({},state,{
//           languageInfo : {
//             ...state.languageInfo,
//             [action.name] : action.value
//           }
//         })
//       default: return state;
//     }
//   }
//   export default LANGUAGE_Reducer;


const initialState = {
  languageList: [],
  languageAdd: [],
  languageDelete:[],
  languageInfo:{
    name:'',
    code:'',
    status:''
  }
}
function LANGUAGE_Reducer(state = initialState, action) {
  console.log("-=-=-=Reducer=-=-=", action)
  switch (action.type) {
    case 'LIST_LANGUAGE':
      return {
        ...state,
        languageList: action.payload.data
      };
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languageAdd: action.payload
      };
    case 'DELETE_LANGUAGE':
      return {
        ...state,
        languageDelete: action.payload

      };
      break;
      case 'VIEW_LANGUAGE':
        return {
          ...state,
          languageInfo: action.payload
        };
      case 'EDIT_LANGUAGE':
        return {
          ...state,
          editLanguage: action.payload
        }
        break;
      case 'UPDATE_LANGUAGE':
        return Object.assign({},state,{
          languageInfo : {
            ...state.languageInfo,
            [action.name] : action.value
          }
        })
    default: return state;
  }
}
export default LANGUAGE_Reducer;

