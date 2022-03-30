import axios from "axios";
const LIST_COUNTRY = 'LIST_COUNTRY';
const ADD_COUNTRY = 'ADD_COUNTRY';
const DELETE_COUNTRY='DELETE_COUNTRY';
const VIEW_COUNTRY='VIEW_COUNTRY'
const UPDATE_COUNTRY='UPDATE_COUNTRY'
export function AC_ADD_COUNTRY(userData) {
    console.log('======Add COUNTRY=========', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/countries/addUpdateCountry", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_COUNTRY, payload: data })
            });
    };
}

export function AC_LIST_COUNTRY() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/countries/listCountries")
            .then(({ data }) => {
                console.log('=======List COUNTRY========', data)
                dispatch({ type: LIST_COUNTRY, payload: data })
            });
    }
}
export function AC_DELETE_COUNTRY(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/countries/deleteCountry",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_COUNTRY,payload:data})
        });
    };
}
export function AC_VIEW_COUNTRY(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/countries/viewCountry",formdata)
        .then(({data}) => {
            dispatch({type:VIEW_COUNTRY,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_COUNTRY, name:name, value:value})
    };
}