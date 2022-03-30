import axios from "axios";
const LIST_FAQ = 'LIST_FAQ';
const ADD_FAQ = 'ADD_FAQ';
const DELETE_FAQ='DELETE_FAQ'
const VIEW_FAQ='VIEW_FAQ'
const UPDATE_FAQ='UPDATE_FAQ'
export function AC_ADD_FAQ(userData) {
    console.log('======Add Faq=========', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/faqs/addUpdateFaq", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_FAQ, payload: data })
            });
    };
}
export function AC_LIST_FAQ() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/faqs/listFaqs")
            .then(({ data }) => {
                console.log('=======List Faq========', data)
                dispatch({ type: LIST_FAQ, payload: data })
            });

    }
}
export function AC_DELETE_FAQ(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/faqs/deleteFaq",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_FAQ,payload:data})
        });
    };
}
export function AC_VIEW_FAQ(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/faqs/viewFaq",formdata)
        .then(({data}) => {
           
            dispatch({type:VIEW_FAQ,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_FAQ, name:name, value:value})
    };
}