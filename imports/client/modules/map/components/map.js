import React, { PropTypes } from 'react';
import KeyHandler, {KEYPRESS} from 'react-key-handler';


import GoogleMap from 'google-map-react';
import MapPointer from '../components/mapPointer';
import PoiInfoWindow from '../containers/poiInfoWindow';


const propTypes = {
    groundImage: React.PropTypes.string,
    map: React.PropTypes.object, //the map dom ref
    maps: React.PropTypes.object  //google Map Object
};

const Map = ({
    centre,
    zoom,
    lastClick,
    loadMapAPI,
    setClickPoint,
    setZoom,
    addGroundOverlay,
    groundOverlayStack,
    map,
    mapsAPI,
    selectPoi,
    selectedPoi,
    destination}) => {

    const _createMapOptions = () => {
        return {
            panControl: false,
            scrollwheel: false,
            mapTypeControl: false
        }
    };

    const _mapsApiLoaded = ({map, maps}) => {
        //maps is the maps API...
        // pass it to state so it can be called from other components.
        console.log("Google Maps API loaded");
        loadMapAPI(map, maps);

        if(destination && destination.groundImage.image){

            var imageBounds = new maps.LatLngBounds(
                //South West.. North east
                new maps.LatLng(destination.groundImage.south, destination.groundImage.west),
                new maps.LatLng(destination.groundImage.north, destination.groundImage.east));

            const someOverlay = new maps.GroundOverlay(
                destination.groundImage.image,
                imageBounds);

            //add the overlays to the Overlays array object in state.. this can scale to include multiple floors.

            const overlay = {
                name: "Ground Floor",
                groundOverlay: someOverlay,
                level: 0,
                centre: destination.centre,
                south: destination.groundImage.south,
                west: destination.groundImage.west,
                north: destination.groundImage.north,
                east: destination.groundImage.east
            };


            console.log("loading Ground Image");
            addGroundOverlay(overlay);
            someOverlay.setMap(map);
        }
    };


    const _onClick = ({x, y, lat, lng, event}) => {
        //going to save this in the state.. its useful to have
        setClickPoint(lat, lng);
    };

    const _setSW = (event) => {
        event.preventDefault();
        if(event.code == "KeyZ") {
            //set the groundOverlay SouthWest Position

            const someOverlay = groundOverlayStack[0]; //a ground overlay on the map
            console.log(someOverlay);
            console.log(someOverlay.groundOverlay.get('bounds'));

            //we need to update the bounds for the overlay.. and redraw the object to the map.

            const imageBounds = new mapsAPI.LatLngBounds(
                //South West.. North east
                new mapsAPI.LatLng(lastClick.lat, lastClick.lng),
                new mapsAPI.LatLng(destination.groundImage.north, destination.groundImage.east));

            console.log(lastClick.lat, lastClick.lng, destination.groundImage.north, destination.groundImage.east);

            someOverlay.groundOverlay.set("bounds",imageBounds);
            someOverlay.groundOverlay.setMap(map);
        }

    };

    const _setNE = (event) => {
        event.preventDefault();
        if(event.code == "KeyP"){
            //set the groundOverlay SouthWest Position

            const someOverlay = groundOverlayStack[0]; //a ground overlay on the map
            console.log(someOverlay);
            console.log(lastClick);

            //we need to update the bounds for the overlay.. and redraw the object to the map.

            const imageBounds = new mapsAPI.LatLngBounds(
                //South West.. North east
                new mapsAPI.LatLng(destination.groundImage.south, destination.groundImage.west),
                new mapsAPI.LatLng(lastClick.lat, lastClick.lng));

            console.log(destination.groundImage.south, destination.groundImage.west, lastClick.lat, lastClick.lng,);

            someOverlay.groundOverlay.set("bounds",imageBounds);
            someOverlay.groundOverlay.setMap(map);
        }
    };

    const _onZoom = () => {
        //map.zoom contains the current zoom... lets put it in state
        setZoom(map.zoom);
    };

    const _distanceToMouse = (markerPos, mousePos, markerProps) => {
        const x = markerPos.x;
        // because of marker non symmetric,
        // we transform it central point to measure distance from marker circle center
        // you can change distance function to any other distance measure
        const y = markerPos.y - 35 / 2;

        // and i want that hover probability on markers with text === 'A' be greater than others
        // so i tweak distance function (for example it's more likely to me that user click on 'A' marker)
        // another way is to decrease distance for 'A' marker
        // this is really visible on small zoom values or if there are a lot of markers on the map
        const distanceKoef = markerProps.text !== 'A' ? 1.5 : 1;

        // it's just a simple example, you can tweak distance function as you wish
        return distanceKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
    };

    

    return (

        //wait for the destination to load before rendering the map..and adding the ground overlay.
        destination && destination.groundImage.image ?
        
        <div style={{
                  position: 'relative',
                  height: '100%',
                  padding: 5
               }}>
            <GoogleMap
                style={{
                    height: 430,
                    padding: 5
                }}
                bootstrapURLKeys={{
                    key: 'AIzaSyBEm7iRJbSjyFHL6EtkHcqkkv_EN04BqqE',
                    language: 'en'
                }}
                onGoogleApiLoaded={_mapsApiLoaded}
                options={_createMapOptions}
                center={centre}
                onZoomAnimationEnd={_onZoom}
                zoom={zoom}
                //distanceToMouse={_distanceToMouse}
                hoverDistance={5}
                yesIWantToUseGoogleMapApiInternals={true}
                onClick={_onClick}>

                {
                    destination.pois.map((somePoi) => (
                        <MapPointer
                            lat={somePoi.lat}
                            lng={somePoi.lng}
                            mainImage={somePoi.mainImage.cdnUrl || ""}
                            selectPoi={selectPoi}
                            selectedPoi={selectedPoi}
                            iconName={somePoi && somePoi.iconName || "rocket"}
                            title={somePoi.title}
                            subtitle={somePoi.subtitle}
                            shortDescription={somePoi.shortDescription}
                            zoom={zoom}
                            phone={somePoi.phone}
                            mail={somePoi.mail}
                            key={somePoi._id}
                            id={somePoi._id}/>
                    ))
                }


            </GoogleMap>
            
            <KeyHandler keyEventName={KEYPRESS} keyValue="z" onKeyHandle={_setSW} />
            <KeyHandler keyEventName={KEYPRESS} keyValue="p" onKeyHandle={_setNE} />

        </div>

            : <p>Waiting for Destination info...</p>
    );
};


Map.propTypes = propTypes;
export default Map;
