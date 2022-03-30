import axios from "axios";
const LIST_LANGUAGE = 'LIST_LANGUAGE';
const ADD_LANGUAGE = 'ADD_LANGUAGE';
const DELETE_LANGUAGE='DELETE_LANGUAGE';
const VIEW_LANGUAGE='VIEW_LANGUAGE'
const UPDATE_LANGUAGE='UPDATE_LANGUAGE'
export function AC_ADD_LANGUAGE(userData) {
    console.log('======Add Language=========', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/languages/addUpdateLanguages", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_LANGUAGE, payload: data })
            });
    };
}

export function AC_LIST_LANGUAGE() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/languages/listLanguages")
            .then(({ data }) => {
                console.log('=======List LANGUAGE========', data)
                dispatch({ type: LIST_LANGUAGE, payload: data })
            });
    }
}
export function AC_DELETE_LANGUAGE(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/languages/deleteLanguage",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_LANGUAGE,payload:data})
        });
    };
}
export function AC_VIEW_LANGUAGE(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/languages/viewLanguages",formdata)
        .then(({data}) => {
            dispatch({type:VIEW_LANGUAGE,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_LANGUAGE, name:name, value:value})
    };
}