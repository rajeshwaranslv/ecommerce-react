import axios from "axios";
const LIST_CONFIGURATION = 'LIST_CONFIGURATION';
const ADD_CONFIGURATION = 'ADD_CONFIGURATION';
const DELETE_CONFIGURATION='DELETE_CONFIGURATION';
const VIEW_CONFIGURATION='VIEW_CONFIGURATION'
const UPDATE_CONFIGURATION='UPDATE_CONFIGURATION'
export function AC_ADD_CONFIGURATION(userData) {
    console.log('======Add CONFIGURATION=========', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/config/addUpdateConfig", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_CONFIGURATION, payload: data })
            });
    };
}

export function AC_LIST_CONFIGURATION() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/config/listConfig")
            .then(({ data }) => {
                console.log('=======List CONFIGURATION========', data)
                dispatch({ type: LIST_CONFIGURATION, payload: data })
            });
    }
}
export function AC_DELETE_CONFIGURATION(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/config/deleteConfig",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_CONFIGURATION,payload:data})
        });
    };
}
export function AC_VIEW_CONFIGURATION(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/config/viewConfig",formdata)
        .then(({data}) => {
            console.log("data",data)
            dispatch({type:VIEW_CONFIGURATION,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_CONFIGURATION, name:name, value:value})
    };
}