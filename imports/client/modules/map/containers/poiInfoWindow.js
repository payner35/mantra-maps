import {useDeps} from 'mantra-core';
import {withRedux, composeAll} from 'react-komposer-plus';
import PoiInfoWindow from '../components/poiInfoWindow';


function mapStateToProps(state) {
    return {
        selectedPoi: state.map.selectedPoi,
        poiOverviewVisible: state.map.poiOverviewVisible,
        zoom: state.map.zoom
    }
}


export const mapDepsToProps = (context, actions) => ({
    context: () => context
});



export default composeAll(
    withRedux(mapStateToProps),
    useDeps(mapDepsToProps),
)(PoiInfoWindow);