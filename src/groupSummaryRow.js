import React from "react";
import { Plugin, Template, TemplateConnector } from "@devexpress/dx-react-core";
import {
    VirtualTable,
    TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";


const digRows = (rows, getCollapsedRows) => {
    if (!rows || !rows.length) return [];

    return rows.reduce((acc, row) => {
        if (!row.groupedBy) acc.push(row);
        return [...acc, ...digRows(getCollapsedRows(row), getCollapsedRows)];
    }, []);
};

const getGroupRows = (group, rows, getCollapsedRows) => {
    const { compoundKey: groupKey } = group;
    const collapsedRows = getCollapsedRows(group) || [];
    const groupRowIndex = rows.findIndex(
        ({ compoundKey }) => compoundKey === groupKey
    );
    const nextGroupRowIndex =
        rows
            .slice(groupRowIndex + 1)
            .findIndex(
                ({ groupedBy, compoundKey }) =>
                    !!groupedBy && compoundKey.indexOf(groupKey) === -1
            ) + groupRowIndex;
    const expandedRows =
        nextGroupRowIndex < groupRowIndex
            ? rows.slice(groupRowIndex + 1)
            : rows.slice(groupRowIndex + 1, nextGroupRowIndex + 1);
    return [...collapsedRows, ...digRows(expandedRows, getCollapsedRows)];
};

export const GroupSummaryRow = () => {
    return (
        <Plugin>
            <Template
                name="tableRow"
                predicate={({ tableRow }) => tableRow.type === TableGroupRow.ROW_TYPE}
            >
                {params => (
                    <TemplateConnector>
                        {({ rows, getCollapsedRows }) => {
                            const aggregated = getGroupRows(
                                params.tableRow.row,
                                rows,
                                getCollapsedRows
                            ).length;
                            return (
                                <TableGroupRow.Row {...params} row={params.tableRow.row}>
                                    {params.children}
                                    <VirtualTable.Cell>
                                        <i>Count: {aggregated}</i>
                                    </VirtualTable.Cell>
                                </TableGroupRow.Row>
                            );
                        }}
                    </TemplateConnector>
                )}
            </Template>
        </Plugin>
    );
};