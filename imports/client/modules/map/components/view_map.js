import React, { PropTypes } from 'react';
import Map from '../containers/map';
import PoiList from '../containers/poiList'
import PoiDrawer from '../containers/poiDrawer';
import PoiInfoWindow from '../containers/poiInfoWindow';
import { Flex, Box } from 'reflexbox'


const propTypes = {
    destination: React.PropTypes.object
};

const View_Map = ({destination}) => {
    

    return (
        <div className="viewMap">
            <h1>{destination && destination.title}</h1>
            <Box p={0}>
                <Flex align='stretch'>
                    <Box col={3} px={1} ><PoiList pois={destination && destination.pois}/></Box>
                    <Box px={0} auto> <Map destination={destination}/></Box>
                    <Box col={3} px={1} flex><PoiInfoWindow destination={destination} /></Box>
                </Flex>
            </Box>
            <PoiDrawer />
        </div>
    );
   
};

View_Map.propTypes = propTypes;
View_Map.displayName = "View Map";
export default View_Map;