import axios from "axios";
const LIST_PAYMENT = 'LIST_PAYMENT';
const ADD_PAYMENT = 'ADD_PAYMENT';
const DELETE_PAYMENT='DELETE_PAYMENT';
const VIEW_PAYMENT='VIEW_PAYMENT'
const UPDATE_PAYMENT='UPDATE_PAYMENT'
export function AC_ADD_PAYMENT(userData) {
    console.log('======Add PAYMENT=========', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/payments/addUpdatePayment", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_PAYMENT, payload: data })
            });
    };
}

export function AC_LIST_PAYMENT() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/payments/listPayments")
            .then(({ data }) => {
                console.log('=======List PAYMENT========', data)
                dispatch({ type: LIST_PAYMENT, payload: data })
            });
    }
}
export function AC_DELETE_PAYMENT(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/payments/deletePayment",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_PAYMENT,payload:data})
        });
    };
}
export function AC_VIEW_PAYMENT(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/payments/viewPayment",formdata)
        .then(({data}) => {
            dispatch({type:VIEW_PAYMENT,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_PAYMENT, name:name, value:value})
    };
}