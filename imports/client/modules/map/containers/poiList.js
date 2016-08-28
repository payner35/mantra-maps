import {useDeps, composeAll, compose} from 'mantra-core';
import PoiList from '../components/poiList';


export const mapDepsToProps = (context, actions) => ({
    selectPoi: actions.map.selectPoi,
    context: () => context
});



export default composeAll(
    useDeps(mapDepsToProps)
)(PoiList);