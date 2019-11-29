import Popover from "@material-ui/core/Popover";
import React from "react";
import {makeStyles} from "@material-ui/core";
import PositionLegend from "./positionLegend";

const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none'
    },
    paper: {
        padding: theme.spacing(1),
        width: 420,
        height: 420
    },
}));

export default function PositionPopover(props) {
    const classes = useStyles();
    const open = Boolean(props.anchorEl);

    return (
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={open}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={props.handlePopoverClose}
            disableRestoreFocus
        >
        <PositionLegend/>
        </Popover>
    );
}
