import * as ActionTypes from './ActionTypes';

export const pictures = (state = { isLoading: true,
                                     errMess: null,
                                     pictures: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PICTURES:
            return {...state, isLoading: false, errMess: null, pictures: action.payload};

        case ActionTypes.PICTURES_LOADING:
            return {...state, isLoading: true, errMess: null, pictures: []}

        case ActionTypes.PICTURES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        case ActionTypes.SELECT_PICTURE:
            console.log("+++++++++selectecd pict of id: ", action.payload);
            let newState = [...state.pictures];
            newState.forEach(picture => {
                picture.selected = picture.id === action.payload ? true : false;
            });
            return {...state, isLoading: false, errMess: null, pictures: newState};
        case ActionTypes.ANIMATE_PICT:
            console.log("animating pict of id: ", action.payload);
            return state;
                    default:
            return state;
      }
};