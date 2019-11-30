import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core/styles';
import {
    TableGroupRow,
    TableHeaderRow, TableSelection, VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import {makeStyles} from '@material-ui/core/styles';
import PositionPopover from "./positionPopover";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    button: {
        margin: theme.spacing(0, 1),
    }
});

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(0, 1),
    }
}));

function PositionLegendButton() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                className={classes.button}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <HelpOutlineIcon/>
            </IconButton>
            <PositionPopover anchorEl={anchorEl} handlePopoverClose={handlePopoverClose}/>
        </div>
    );

}

const TableHeaderCellBase = ({column, children, classes, onGroup, groupingEnabled, draggingEnabled, ...restProps}) => {
    if (column.name === 'Club' || column.name === 'Country' || column.name === 'League') {
        let updatedChildren = [children[0], children[1]];
        return (
            <TableHeaderRow.Cell column={column} draggingEnabled={false} {...restProps}>
                <TableHeaderRow.Content column={column}> {updatedChildren} </TableHeaderRow.Content>
                <Tooltip title="Click to group">
                    <IconButton
                                className={classes.button}
                                onClick={onGroup}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </TableHeaderRow.Cell>
        );
    } else if (column.name === 'Name' || column.name === 'Overall') {
        let updatedChildren = [children[0], children[1]];
        return (
            <TableHeaderRow.Cell column={column} draggingEnabled={false} {...restProps}>
                <TableHeaderRow.Content column={column}> {updatedChildren} </TableHeaderRow.Content>
            </TableHeaderRow.Cell>
        );
    } else {
        return (
            <TableHeaderRow.Cell column={column} draggingEnabled={false} {...restProps}>
                {column.title}
                <PositionLegendButton/>
            </TableHeaderRow.Cell>
        )
    }
};

const selectionStyles = {
    selection0: {
        backgroundColor: 'antiqueWhite',
        boxShadow: '#ccc 1px 1px 4px'
    },
    selection1: {
        backgroundColor: 'lavender',
        boxShadow: '#ccc 1px 1px 4px'
    }
};

export const TableSelectionRow = ({tableRow, onToggle, ...restProps}) => {
    return (
        <TableSelection.Row
            {...restProps}
            onClick={() => {
                tableRow.row.selectionIdx = undefined;
                onToggle();
            }}
            style={{
                ...selectionStyles['selection' + tableRow.row.selectionIdx],
            }}
        />
    );
};

export const TableRow = ({tableRow, onToggle, ...restProps}) => {
    return (
        <VirtualTable.Row
            {...restProps}
            onClick={() => {
                onToggle();
            }}
        />
    );
};

export const GroupCell = ({colSpan, ...restProps}) => {
    return <TableGroupRow.Cell {...restProps} colSpan={colSpan - 1}/>;
};

export const TableHeaderCell = withStyles(styles, {name: 'TableHeaderCell'})(TableHeaderCellBase);
