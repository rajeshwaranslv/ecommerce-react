import axios from "axios";
const LIST_NEWSLETTER = 'LIST_NEWSLETTER';
const ADD_NEWSLETTER = 'ADD_NEWSLETTER';
const DELETE_NEWSLETTER='DELETE_NEWSLETTER';
const VIEW_NEWSLETTER='VIEW_NEWSLETTER'
const UPDATE_NEWSLETTER='UPDATE_NEWSLETTER'
export function AC_ADD_NEWSLETTER(userData) {
    console.log('======Add NEWSLETTER=========', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/newsletters/addUpdatenewsletter", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_NEWSLETTER, payload: data })
            });
    };
}

export function AC_LIST_NEWSLETTER() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/newsletters/listnewsletter")
            .then(({ data }) => {
                console.log('=======List NEWSLETTER========', data)
                dispatch({ type: LIST_NEWSLETTER, payload: data })
            });
    }
}
export function AC_DELETE_NEWSLETTER(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/newsletters/deletenewsletter",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_NEWSLETTER,payload:data})
        });
    };
}
export function AC_VIEW_NEWSLETTER(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/newsletters/viewnewsletter",formdata)
        .then(({data}) => {
            dispatch({type:VIEW_NEWSLETTER,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_NEWSLETTER, name:name, value:value})
    };
}