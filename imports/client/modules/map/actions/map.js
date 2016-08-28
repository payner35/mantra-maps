export default {
    loadMapAPI({Meteor, Store}, map, mapsAPI) {
        //loading up the maps API into state.
        return Store.dispatch({
            type: 'LOAD_MAP_API',
            map: map,
            mapsAPI: mapsAPI,
            trace: "Google Maps API loaded"
        });
    },
    loadMapDestination({Meteor, Store}, destination) {
        //loading up a destination to the map..
        return Store.dispatch({
            type: 'LOAD_MAP_DESTINATION',
            destination: destination,
            trace: "Loading up the Destination " + destination.title
        });
    },
    setClickPoint({Meteor, Store}, lat, lng) {
        //save the most recent click point
        return Store.dispatch({
            type: 'MAP_CLICK_POINT',
            lat: lat,
            lng: lng,
            trace: "Google Maps click event"
        });
    },
    addGroundOverlay({Meteor, Store}, groundOverlay) {
        //save the most recent click point
        return Store.dispatch({
            type: 'ADD_GROUND_OVERLAY',
            groundOverlay: groundOverlay,
            trace: "Ground Overlay added to stack at level"
        });
    },
    setZoom({Meteor, Store}, zoom) {
        //save the most recent zoom change
        return Store.dispatch({
            type: 'SET_MAP_ZOOM',
            zoom: zoom,
            trace: "The Zoom has changed"
        });
    },
    selectPoi({Meteor, Store}, selectedPoi) {
        //sets the selected POI..  we should update centre as well
        return Store.dispatch({
            type: 'SELECT_POI',
            selectedPoi: selectedPoi,
            trace: "A user has clicked some Poi on the map"
        });
    },
    setPoiOverviewVisible({Meteor, Store}, poiOverviewVisible) {
        //sets the infoview on / off
        return Store.dispatch({
            type: 'SET_POI_OVERVIEW_VISIBLE',
            poiOverviewVisible: poiOverviewVisible,
            trace: "The poiView Overlay has been switched"
        });
    }
};