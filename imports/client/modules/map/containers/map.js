import {useDeps} from 'mantra-core';
import {withRedux, composeAll} from 'react-komposer-plus';
import map from '../components/map';

    
function mapStateToProps(state) {
    return {
        centre: state.map.centre,
        zoom: state.map.zoom,
        groundOverlayStack: state.map.groundOverlayStack,
        lastClick: state.map.lastClick,
        map: state.map.map,
        mapsAPI: state.map.mapsAPI,
        selectedPoi: state.map.selectedPoi
    }
}

export const mapDepsToProps = (context, actions) => ({
    loadMapAPI: actions.map.loadMapAPI,
    setClickPoint: actions.map.setClickPoint,
    addGroundOverlay: actions.map.addGroundOverlay,
    setZoom: actions.map.setZoom,
    selectPoi: actions.map.selectPoi,
    context: () => context
});



export default composeAll(
    withRedux(mapStateToProps),
    useDeps(mapDepsToProps),
)(map);


