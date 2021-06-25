import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchPictures = () => dispatch => {

    dispatch(picturesLoading());

    return fetch(baseUrl + 'pictures')
        .then(response => {
                if (response.ok) {
        console.log("pictures ------ response OK!")

                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
        console.log("error loading pictures!")
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(pictures => dispatch(addPictures(pictures)))
        .catch(error => dispatch(picturesFailed(error.message)));
};

export const picturesLoading = () => ({
    type: ActionTypes.PICTURES_LOADING
});

export const picturesFailed = errMess => ({
    type: ActionTypes.PICTURES_FAILED,
    payload: errMess
});

export const addPictures = pictures => ({
    type: ActionTypes.ADD_PICTURES,
    payload: pictures
});

export const selectPicture = pictureId => dispatch => {
    console.log("picture selected: ");
    setTimeout(() => {
        dispatch(selectPict(pictureId));
    }, 2000);
};

export const selectPict = pictureId => ({
    type: ActionTypes.SELECT_PICTURE, 
    payload: pictureId
});


