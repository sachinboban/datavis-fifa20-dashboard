import React from "react";
import Col from "react-bootstrap/Col";
import {Paper} from "@material-ui/core";
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
    TableFilterRow,
    TableSelection,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import {
    FilteringState,
    SortingState,
    IntegratedFiltering,
    IntegratedSorting,
    SelectionState,
    GroupingState,
    IntegratedGrouping
} from "@devexpress/dx-react-grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {GroupSummaryRow} from "./groupSummaryRow";
import {TableHeaderCell, TableRow, TableSelectionRow, GroupCell} from "./customTableComps";

class PlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.columnHeaders = [
            "Pos",
            "Name",
            "Country",
            "Club",
            "League",
            "Overall"
        ];
        this.columnWidths = [
            {columnName: "Pos", width: 125},
            {columnName: "Name", width: 150},
            {columnName: "Country", width: 150},
            {columnName: "Club", width: 150},
            {columnName: "League", width: 150},
            {columnName: "Overall", width: 125}
        ];
        this.groupingState = [
            {columnName: 'Pos', groupingEnabled: false},
            {columnName: 'Name', groupingEnabled: false},
            {columnName: 'Overall', groupingEnabled: false},
        ];
        this.filteringState = [
            {columnName: 'Pos', filteringEnabled: false},
            {columnName: 'Overall', filteringEnabled: false},
        ];
        this.sortingState = [
            {columnName: 'Pos', sortingEnabled: false},
        ];
        this.state = {
            rows: [],
            columns: [],
            selection: [],
            dataLoadComplete: 25
        };
    }

    componentDidMount() {
        this.setState({
            rows: [],
            columns: [],
            selection: [],
            dataLoadComplete: 75
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data && this.props.data && this.props.data.length > 0) {
            let rows = this.props.data.slice();
            let columns = this.columnHeaders.map(col => {
                return {name: col, title: col};
            });
            this.setState({
                rows: rows,
                columns: columns,
                selection: [],
                dataLoadComplete: 100
            });
        }
    }

    onSelectionChange = selection => {
        let rows = [...this.state.rows];

        //always choose last two selections after resetting prev selection
        if (selection.length > 2) {
            rows[selection[0]].selectionIdx = undefined;
            selection = selection.slice(-2);
        }

        //alternate selection style between two selections in round robin
        if (selection.length === 1) {
            rows[selection[0]].selectionIdx = rows[selection[0]].selectionIdx === 1 ? 1 : 0;
        } else if (selection.length === 2) {
            rows[selection[1]].selectionIdx = rows[selection[0]].selectionIdx === 0 ? 1 : 0;
        }

        this.setState({
            rows: rows,
            columns: this.state.columns,
            selection: selection,
            dataLoadComplete: this.state.dataLoadComplete
        });
        //notify other views about selection change
        let selectedPlayers = [];
        for (let index of selection) {
            selectedPlayers.push(this.state.rows[index]);
        }
        this.props.onSelectionChange(selectedPlayers);
    };


    render() {
        return (
            <Col>
                <Paper>
                    {this.state.dataLoadComplete === 100 ?
                        null : <LinearProgress variant="determinate" value={this.state.dataLoadComplete}/>}

                    <Grid rows={this.state.rows} columns={this.state.columns}>
                        <SortingState
                            defaultSorting={[{columnName: "Name", direction: "asc"}]}
                            columnExtensions={this.sortingState}
                        />
                        <IntegratedSorting/>

                        <DragDropProvider/>
                        <GroupingState defaultGrouping={[]} columnExtensions={this.groupingState}/>
                        <IntegratedGrouping/>
                        <FilteringState defaultFilters={[]} columnExtensions={this.filteringState}/>
                        <IntegratedFiltering/>
                        <SelectionState
                            selection={this.state.selection}
                            onSelectionChange={this.onSelectionChange}
                        />
                        <VirtualTable columnExtensions={this.columnWidths} rowComponent={TableRow}/>
                        <TableHeaderRow showSortingControls showGroupingControls draggingEnabled={false}
                                        cellComponent={TableHeaderCell}/>
                        <TableSelection selectByRowClick highlightRow showSelectionColumn={false}
                                        rowComponent={TableSelectionRow}/>
                        <TableGroupRow cellComponent={GroupCell}/>
                        <GroupSummaryRow/>
                        <Toolbar/>
                        <GroupingPanel showGroupingControls showSortingControls
                                       messages={{'groupByColumn': 'Click on plus icon next to column name to group by that column'}}/>
                        <TableFilterRow/>
                    </Grid>
                </Paper>
            </Col>
        );
    }
}

export default PlayerTable;
