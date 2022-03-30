import axios from "axios";
const ADD_IMAGE = "ADD_IMAGE";
const LIST_IMAGES = "LIST_IMAGES";
const DELETE_IMAGE = "DELETE_IMAGE";
const VIEW_IMAGE = "VIEW_IMAGE";
const EDIT_IMAGE="EDIT_IMAGE";
const UPDATE_IMAGE_DATA = "UPDATE_IMAGE_DATA";
export function AC_ADD_IMAGE(formdata) {
    return function (dispatch) {
        axios.post("http://localhost:8000/api/v1/category/addUpdateImage", formdata)
            .then(({ data }) => {
                dispatch({ type: ADD_IMAGE, payload: data });
            });
    }
}
export function AC_LIST_IMAGES() {
    return function (dispatch) {
        axios.get("http://localhost:8000/api/v1/category/listImages")
            .then(({ data }) => {
                dispatch({ type: LIST_IMAGES, payload: data });
                console.log("=-=-=action-=-", data);
            });
    }
}
export function AC_VIEW_IMAGE(formData) {
    return function (dispatch) {
        axios.post("http://localhost:8000/api/v1/category/viewImage", formData)
            .then(({ data }) => {
                dispatch({ type: VIEW_IMAGE, payload: data });

            });
    }
}
export function AC_DELETE_IMAGE(formData) {
    return function (dispatch) {
        axios.post("http://localhost:8000/api/v1/category/deleteImage", formData)
            .then(({ data }) => {
                dispatch({ type: DELETE_IMAGE, payload: data });
            });
    }
}
export function AC_EDIT_IMAGE(formData) {
    return function (dispatch) {
        axios.post("http://localhost:8000/api/v1/category/addUpdateImage", formData)
            .then(({ data }) => {
                dispatch({ type: EDIT_IMAGE, payload: data });
            });
    }
}
export function AC_HANDLE_INPUT_CHANGE(name, value) {
    return function (dispatch) {
        dispatch({ type: UPDATE_IMAGE_DATA, name: name, value: value });

    }
}
