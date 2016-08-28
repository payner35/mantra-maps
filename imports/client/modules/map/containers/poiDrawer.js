import {useDeps} from 'mantra-core';
import {withRedux, composeAll} from 'react-komposer-plus';
import PoiDrawer from '../components/poiDrawer';


function mapStateToProps(state) {
    return {
        selectedPoi: state.map.selectedPoi,
        poiOverviewVisible: state.map.poiOverviewVisible
    }
}

export const mapDepsToProps = (context, actions) => ({
    selectPoi: actions.map.selectPoi,
    context: () => context
});


export default composeAll(
    withRedux(mapStateToProps),
    useDeps(mapDepsToProps),
)(PoiDrawer);




