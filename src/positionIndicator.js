import React from "react";
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';
import teal from '@material-ui/core/colors/teal';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from "@material-ui/core/Avatar";

export let colorMap = {
    GK: {
        GK: orange[600]
    },
    DEF: {
        CB: blue[300],
        LB: blue['A200'],
        RB: blue[900],
        LWB: indigo[300],
        RWB: indigo['A700'],
    },
    MID: {
        CDM: lightGreen[300],
        CAM: green[500],
        LM: teal[700],
        CM: teal[900],
        RM: teal['A700'],
        LW: green['A400'],
        RW: lightGreen['A700'],
    },
    ATT: {
        CF: red[900],
        ST: red[500]
    }
};

let tooltip = {
    GK: "Goal Keeper",
    CB: "Center Back",
    LB: "Left Back",
    RB: "Right Back",
    LWB: "Left Wing Back",
    RWB: "Right Wing Back",
    CDM: "Central Defensive Midfielder",
    CM: "Central Midfielder",
    CAM: "Central Attacking Midfielder",
    LM: "Left Midfielder",
    RM: 'Right Midfielder',
    LW: 'Left Winger',
    RW: 'Right Winger',
    CF: "Center Forward",
    ST: "Striker"
};



function getColorByPosition(pos) {
    let positionGroup;
    for (let posGrp in colorMap) {
        if (colorMap[posGrp][pos]) {
            positionGroup = posGrp;
            break;
        }
    }

    return colorMap[positionGroup][pos];
}

function createDots(positions) {
    let dots = [];
    for (let position of positions) {
        let color = getColorByPosition(position);
        const dotStyle = {
            backgroundColor: color,
            width: 25,
            height: 25,
            marginLeft: 5,
            fontSize: 10,
            boxShadow: '1px 1px 2px #000',
            fontWeight: 'bolder'
        };
        dots.push(
            <Tooltip title={tooltip[position]} key={position}>
                <Avatar
                    style={dotStyle}>
                    {position}
                </Avatar>
            </Tooltip>
        );
    }

    return dots;
}

function getPositionIndicator(position) {
    let positions = position.split(",");
    return (
        <div className="pos" style={{display: 'flex'}}>{createDots(positions)}</div>
    );
}

export default getPositionIndicator;