import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import reactCSS from 'reactcss';
import {List, ListItem} from 'material-ui/List';
import SearchInput, {createFilter} from 'react-search-input'


const PoiList = React.createClass({

    getInitialState () {
        return { searchTerm: '' }
    },

    propTypes: {
        pois: React.PropTypes.array,
        selectPoi: React.PropTypes.func
    },

    _selectPoi (somePoi) {
        const {selectPoi} = this.props;

        //console.log(somePoi);
        // the user clicked on a poi.. send to the state,

        const selectedPoi = {
            _id: somePoi._id,
            lat: somePoi.lat,
            lng: somePoi.lng,
            title: somePoi.title,
            subtitle: somePoi.subtitle,
            mainImage: somePoi.mainImage.cdnUrl || "",
            shortDescription: somePoi.shortDescription,
            phone: somePoi.phone,
            mail: somePoi.mail
        };
        selectPoi(selectedPoi);
        //this will send this to the state... as the selected POI.
    },

    searchUpdated (term) {
        this.setState({searchTerm: term})
    },



    render () {
        const styles = reactCSS({
            'default': {
                searchInput: {
                    borderRadius: 15,
                    width: '100%',
                    height: 35,
                    padding: 10
                }
            }
        });

        const {pois} = this.props;
        const KEYS_TO_FILTERS = ['title', 'subtitle'];


        let filteredPois = []; //default empty
        if(pois && pois.length > 0) {
            filteredPois = pois.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        }

        return (
            pois && pois.length > 1 ?

                <div>
                    <SearchInput style={styles.searchInput} onChange={this.searchUpdated} />
                    <List>
                        {
                            filteredPois.map((somePoi) => (
                                <ListItem
                                    onClick={this._selectPoi.bind(this, somePoi)}
                                    key={somePoi._id}
                                    primaryText={somePoi.title}
                                    secondaryText={somePoi.subtitle}
                                    leftIcon={
                                <FontAwesome
                                    name={somePoi.iconName || "map-marker"}
                                    size="2x"/>
                                } />
                            ))
                        }
                    </List>
                </div>

                : <p>Waiting for POI info...</p>

        )
    }

})

export default PoiList;
