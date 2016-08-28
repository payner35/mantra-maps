import React, { PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import reactCSS from 'reactcss';
import Drawer from 'material-ui/Drawer';


const PoiDrawer = React.createClass({

    propTypes: {
        selectedPoi: React.PropTypes.object,
        poiOverviewVisible: React.PropTypes.bool
    },


    render () {
        const {selectedPoi, poiOverviewVisible} = this.props;

        const styles = reactCSS({
            'default': {
                card: {
                    color: '#444040',
                    width: '100%',
                    top: 50
                },
                title: {
                    fontSize: '17px'
                }
            }
        });



        return (
            <Drawer width={400} openSecondary={true} open={false} >
                <Card style={styles.card}>
                    <CardMedia
                        overlay={<CardTitle title={selectedPoi.title} />}
                    >
                        <img src={selectedPoi.mainImage} />
                    </CardMedia>
                    <CardTitle
                        style={styles.title}
                        subtitle={selectedPoi.subtitle} />
                    <CardActions>
                        <FlatButton label="Explore" />
                    </CardActions>
                </Card>
            </Drawer>
        )
    }

})

export default PoiDrawer;
