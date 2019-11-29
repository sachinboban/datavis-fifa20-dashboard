import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import './css/positionLegend.css';
import {colorMap} from "./positionIndicator";

function PositionLegend() {
    return (
        <div className="ground">
            <div className="rect1"/>
            <div className="circle"/>
            <div className="midLine"/>
            <Grid container className="pos-row row6">
                <Avatar
                    style={{
                        backgroundColor: colorMap.ATT.ST,
                        fontSize: 14,
                        marginLeft: 140
                    }}>
                    ST</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.ATT.CF,
                        fontSize: 14,
                        marginLeft: 30
                    }}>
                    CF</Avatar>

            </Grid>
            <Grid container className="pos-row row5">
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.LW,
                        fontSize: 14,
                        marginLeft: 10
                    }}>
                    LW</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.CAM,
                        fontSize: 14,
                        marginLeft: 125
                    }}>
                    CAM</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.RW,
                        fontSize: 14,
                        marginLeft: 130
                    }}>
                    RW</Avatar>
            </Grid>
            <Grid container className="pos-row row4">
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.LM,
                        fontSize: 14,
                        marginLeft: 10
                    }}>
                    LM</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.CM,
                        fontSize: 14,
                        marginLeft: 125
                    }}>
                    CM</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.RM,
                        fontSize: 14,
                        marginLeft: 130
                    }}>
                    RM</Avatar>
            </Grid>

            <Grid container className="pos-row row3">
                <Avatar
                    style={{
                        backgroundColor: colorMap.DEF.LWB,
                        marginLeft: 10,
                        fontSize: 14
                    }}>
                    LWB</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.MID.CDM,
                        marginLeft: 125,
                        fontSize: 14
                    }}>
                    CDM</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.DEF.RWB,
                        marginLeft: 130,
                        fontSize: 14
                    }}>
                    RWB</Avatar>
            </Grid>
            <Grid container className="pos-row row2">
                <Avatar
                    style={{
                        backgroundColor: colorMap.DEF.LB,
                        marginLeft: 10,
                        fontSize: 14
                    }}>
                    LB</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.DEF.CB,
                        marginLeft: 40,
                        fontSize: 14
                    }}>
                    CB</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.DEF.CB,
                        marginLeft: 40,
                        fontSize: 14
                    }}>
                    CB</Avatar>
                <Avatar
                    style={{
                        backgroundColor: colorMap.DEF.RB,
                        marginLeft: 40,
                        fontSize: 14

                    }}>
                    RB</Avatar>

            </Grid>
            <div className="rect2"/>
            <Grid container className="pos-row row1">
                <Avatar
                    style={{backgroundColor: colorMap.GK.GK, fontSize: 14}}>
                    GK</Avatar>
            </Grid>
        </div>
    );
}

export default PositionLegend;