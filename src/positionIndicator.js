import React from "react";
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

let positionMap = {
    GK: {
        GK: 900
    },
    DEF: {
        CB: 300,
        LB: 700,
        RB: 900,
        LWB: 'A200',
        RWB: 'A400'
    },
    MID: {
        CDM: 300,
        CM: 500,
        CAM: 700,
        LM: 900,
        RM: 'A200',
        LW: 'A400',
        RW: 'A700',
    },
    ATT: {
        CF: 500,
        ST: 900
    }
};


let colorMap = {
    GK: orange,
    DEF: blue,
    MID: green,
    ATT: red
};

function getColorByPosition(pos) {
    let positionGroup;
    for (let posGrp in positionMap) {
        if (positionMap[posGrp][pos]) {
            positionGroup = posGrp;
            break;
        }
    }

    let colorForGroup = colorMap[positionGroup];
    return colorForGroup[positionMap[positionGroup][pos]];
}

function createDots(positions) {
    let dots = [];
    for (let position of positions) {
        let color = getColorByPosition(position);
        const dotStyle = {
            backgroundColor: color,
            borderRadius: 5,
            width: 10,
            height: 10,
            marginLeft:10
        };
        dots.push(<div key={position} title={position} className="pos-dot" style={dotStyle}/>);
    }

    return dots;
}

function getPositionIndicator(position) {
    let positions = position.split(",");
    return (
        <div className="pos">{createDots(positions)}</div>
    );
}

export default getPositionIndicator;