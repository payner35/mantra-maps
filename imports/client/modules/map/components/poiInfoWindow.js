import React, { PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {indigo500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import reactCSS from 'reactcss';


const PoiInfoWindow = React.createClass({

    propTypes: {
        selectedPoi: React.PropTypes.object,
        poiOverviewVisible: React.PropTypes.bool,
        destination: React.PropTypes.object
    },


    render () {
        const {selectedPoi, poiOverviewVisible, destination, zoom} = this.props;
        //console.log(selectedPoi);

        const styles = reactCSS({
            'default': {
                card: {
                    //display: poiOverviewVisible ?  "inline" : "none",
                    //position: 'absolute',
                    color: '#444040',
                    width: 280,
                    height: '100%'
                },
                title: {
                    fontSize: '17px'
                }
            }
        });


        return (
            destination && destination.title ?

                selectedPoi && selectedPoi.title && (zoom > 16) ?

            <div>
                <Card style={styles.card}>
                    <CardMedia
                        overlay={<CardTitle title={selectedPoi.title} />}
                    >
                        <img src={selectedPoi.mainImage} />
                    </CardMedia>
                    <CardText>
                        {selectedPoi.shortDescription}
                        <List>
                            { selectedPoi.phone ?
                                <ListItem
                                    style={{fontSize: 14}}
                                    disabled={true}
                                    leftIcon={<CommunicationCall color={indigo500} />}
                                    primaryText={selectedPoi.phone}
                                />
                                : null }
                            { selectedPoi.mail ?
                                <ListItem
                                    style={{fontSize: 14}}
                                    disabled={true}
                                    leftIcon={<CommunicationEmail color={indigo500} />}
                                    primaryText={selectedPoi.mail}
                                />
                                : null }
                        </List>
                    </CardText>
                    <CardActions>
                        <FlatButton secondary={true} label="Explore" />
                    </CardActions>
                </Card>
            </div>

                    :(
                        <div>
                            <Card style={styles.card}>
                                <CardMedia
                                    overlay={<CardTitle title={destination.title} />}
                                >
                                    <img src={destination.mainImage.cdnUrl} />
                                </CardMedia>
                                <CardTitle
                                    subtitle={destination.subtitle} />
                            </Card>
                        </div>
                    )

                : <div><p>Waiting for destination to load...</p></div>
        )
    }

})

export default PoiInfoWindow;
