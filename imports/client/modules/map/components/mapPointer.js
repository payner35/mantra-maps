import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import reactCSS from 'reactcss';
import ReactTooltip from "react-tooltip";


const MapPointer = ({
    iconName,
    lat,
    lng,
    selectPoi,
    selectedPoi,
    $hover,
    id,
    title,
    subtitle,
    shortDescription,
    mainImage,
    phone,
    mail,
    zoom}) => {


    const MARKER_SIZE_W = (selectedPoi && selectedPoi._id == id) ? 90 : 55;
    const MARKER_SIZE_H = (selectedPoi && selectedPoi._id == id) ? 82 : 55;
    //the icon changes size if it selected..  we need to tweak th9is as well

    const ICON_COLOR = (selectedPoi && selectedPoi._id == id) ? '#374231' : '#838a7f';


    const styles = reactCSS({
        'default': {
            mapIcon: {
                display: (zoom > 16 && selectedPoi && selectedPoi._id == id ) ? "inline" : "none",
                position: 'absolute',
                width: MARKER_SIZE_W,
                height: MARKER_SIZE_H,
                left: -MARKER_SIZE_W / 2,
                bottom: -20
            },
            icon: {
                color: ICON_COLOR,
                border: '0px solid red'
            },
            tooltip: {

            }
        },
        'isHover': {
            mapIcon: {
                // triggered from the check below..
                //border: '2px solid #000000',
                //left: (-MARKER_SIZE) / 2,
                //top: (-MARKER_SIZE) / 2
            },
            icon: {
                //fontSize: '4.5em'
            }
        }
    },{
        'isHover': $hover == true //$hover is pass from the map object..come with the lib
    });


    const _selectPoi = () => {
        // the user clicked on a ppi.. send to the state,
        const selectedPoi = {
            _id: id,
            lat: lat,
            lng: lng,
            title: title,
            subtitle: subtitle,
            mainImage: mainImage,
            shortDescription: shortDescription,
            phone: phone,
            mail: mail
        };

        selectPoi(selectedPoi);
    };


    return (
        <div data-tip data-for={id}
             style={styles.mapIcon}
             onClick={_selectPoi}>
            <FontAwesome
                style={styles.icon}
                name={"map-marker"}
                border={true}
                fixedWidth={true}
                size={(selectedPoi && selectedPoi._id == id) ? "5x" : "3x"}/>
            <ReactTooltip
                type="success"
                id={id}
                effect='solid'>
                <div style={styles.tooltip}>{title}</div>
            </ReactTooltip>
        </div>

    );
};

export default MapPointer;
