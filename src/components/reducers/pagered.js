const initialState = {
    pageList: [],
    pageAdd: [],
    pageDelete: [],
    pageInfo: {
        title: '',
        description: '',
        status: '',
        id: ''
    }
}
function PAGE_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
        case 'LIST_PAGE':
            return {
                ...state,
                pageList: action.payload.data
            };
        case 'ADD_PAGE':
            return {
                ...state,
                pageAdd: action.payload
            };
        case 'DELETE_PAGE':
            return {
                ...state,
                pageDelete: action.payload
            };
        case 'VIEW_PAGE':
            return {
                ...state,
                pageInfo: action.payload
            };
        case 'EDIT_PAGE':
            return {
                ...state,
                editPage: action.payload
            }
            break;
        case 'UPDATE_PAGE':
            return Object.assign({}, state, {
                pageInfo: {
                    ...state.pageInfo,
                    [action.name]: action.value
                }
            })
        default: return state;
    }
}
export default PAGE_Reducer;