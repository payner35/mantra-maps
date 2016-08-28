

const initialState = {
    mapsAPI: null, //the google maps api
    centre: {lat: 25.076409, lng: 55.1291873},
    zoom: 17,
    selectedPoi: {}, //the selected poi from the user
    lastClick: {lat: 0, lng: 0},
    groundOverlayStack: [], // a stack of Ground Overlays..one of each floor
    poiOverviewVisible: true //default to false
};


export function map(state = initialState, action = {}) {
    switch (action.type) {
        case "LOAD_MAP_API":
            return {
                ...state,
                mapsAPI: action.mapsAPI,
                map: action.map
            };
        case "LOAD_MAP_DESTINATION":
            return {
                ...state,
                destination: action.destination,
                centre: action.destination.centre,
                zoom: action.destination.zoom
            };
        case "MAP_CLICK_POINT":
            return {
                ...state,
                lastClick: {
                    lat: action.lat,
                    lng: action.lng
                }
            };
        case "ADD_GROUND_OVERLAY":
            state.groundOverlayStack.splice(action.level, 0, action.groundOverlay); //add to array at level.
            //console.log(action.groundOverlay);
            return {
                ...state
            };
        case "SET_MAP_ZOOM":
            //if the zoom level is zooming back in from above... it
            //would be nice to reset any selected POI.

            return {
                ...state,
                zoom: action.zoom,
                selectedPoi: (state.zoom == 17 && action.zoom == 16)? {}: state.selectedPoi
                //are we zooming out of Range.. all POI disappear.. and the selected POI switches off
            };
        case "SELECT_POI":
            return {
                ...state,
                selectedPoi: action.selectedPoi,
                centre: {
                    lat: action.selectedPoi.lat,
                    lng: action.selectedPoi.lng
                },
                zoom: 18 //default zoom level for clicked poi

            };
        case "SET_POI_OVERVIEW_VISIBLE":
            return {
                ...state,
                poiOverviewVisible: action.poiOverviewVisible
            };
        default:
            return state;
    }
}


export default map;