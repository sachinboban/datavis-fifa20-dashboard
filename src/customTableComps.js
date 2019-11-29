import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core/styles';
import {
    TableGroupRow,
    TableHeaderRow, TableSelection, VirtualTable
} from '@devexpress/dx-react-grid-material-ui';

const styles = theme => ({
    button: {
        margin: theme.spacing(0, 1),
    },
});


const TableHeaderCellBase = ({column, children, classes, onGroup, groupingEnabled, draggingEnabled, ...restProps}) => {
    if (column.name === 'Club' || column.name === 'Country' || column.name === 'League') {
        let updatedChildren = [children[0], children[1]];
        return (
            <TableHeaderRow.Cell column={column} draggingEnabled={false} {...restProps}>
                <TableHeaderRow.Content column={column}> {updatedChildren} </TableHeaderRow.Content>
                <IconButton title="Click to group"
                            className={classes.button}
                            onClick={onGroup}>
                    <AddIcon/>
                </IconButton>
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
                <IconButton
                    title="Click to see legend"
                    className={classes.button}
                    onClick={() => alert('Help action')}
                >
                    <HelpOutlineIcon/>
                </IconButton>
            </TableHeaderRow.Cell>
        )
    }
};

const selectionStyles = {
    selection0: {
        backgroundColor: 'linen',
        boxShadow: '#777 1px 1px 4px'
    },
    selection1: {
        backgroundColor: 'lavender',
        boxShadow: '#777 1px 1px 4px'
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
