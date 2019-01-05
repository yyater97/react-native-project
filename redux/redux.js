import {createStore} from 'redux';

//State
let defaultState = {
    routes:'',
    region: {
        latitude: 10.8830802,
        longitude: 106.7808475,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    }
}

//Action
const clickedMarker = (routes) => {
    return{
        type: 'CLICKED',
        routes: routes
    }
}

const clickedSearchItem = (region) => {
    return{
        type: 'CLICKED_SEARCH_ITEM',
        region: region
    }
}

//Reducer
const clickedMarkerReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'CLICKED':
            state = {
                ...state,
                routes: action.routes,
            }
        break;
        case 'CLICKED_SEARCH_ITEM':
            state = {
                ...state,
                region: action.region,
            }
        break;
    }
    
    return state;
}

//Store
export const store = createStore(clickedMarkerReducer, defaultState);
