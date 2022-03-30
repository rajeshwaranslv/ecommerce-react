import axios from "axios";
const LIST_USER = 'LIST_USER';
const VIEW_USER='VIEW_USER'
export function AC_LIST_USER() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/register/listUsers")
            .then(({ data }) => {
                console.log('=======List USER========',data)
                dispatch({ type: LIST_USER, payload: data })
            });
    }
}

export function AC_VIEW_USER(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/register/viewUser",formdata)
        .then(({data}) => {
            dispatch({type:VIEW_USER,payload:data})
        });
    };
}