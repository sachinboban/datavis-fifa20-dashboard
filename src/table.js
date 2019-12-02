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
            dataLoadComplete: 25,
            isLegendDiaglogOpen: false
        };
    }

    componentDidMount() {
        this.setState({
            rows: [],
            columns: [],
            selection: [],
            dataLoadComplete: 75,
            isLegendDiaglogOpen: false
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data && this.props.data && this.props.data.length > 0) {
            let rows = this.props.data.slice();
            let columns = this.columnHeaders.map(col => {
                if(col === "Pos"){
                    return {name: col, title: "Position"};
                }
                return {name: col, title: col};
            });
            this.setState({
                rows: rows,
                columns: columns,
                selection: [],
                dataLoadComplete: 100,
                isLegendDiaglogOpen: false
            });
        }

        if(prevProps.isDemoOn !== this.props.isDemoOn){
            if(this.props.isDemoOn){
                this.setDemoSelection();
            }else{
                this.resetDemoSelection();
            }
        }
    }
    setDemoSelection = () => {
        let rows = [...this.state.rows];
        for(let index of this.state.selection){
            rows[index].selectionIdx = undefined;
        }
        this.setState({
            rows: rows,
            columns: this.state.columns,
            selection: [],
            dataLoadComplete: this.state.dataLoadComplete,
            isLegendDiaglogOpen: this.state.isLegendDiaglogOpen
        });
        this.onSelectionChange([1]);
        this.onSelectionChange([1,0]);
    };

    resetDemoSelection = () => {
        let rows = [...this.state.rows];
        rows[0].selectionIdx = undefined;
        rows[1].selectionIdx = undefined;
        this.setState({
            rows: rows,
            columns: this.state.columns,
            selection: [],
            dataLoadComplete: this.state.dataLoadComplete,
            isLegendDiaglogOpen: this.state.isLegendDiaglogOpen
        });
        this.notifyPlayerSelection([]);
    };

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
            dataLoadComplete: this.state.dataLoadComplete,
            isLegendDiaglogOpen: this.state.isLegendDiaglogOpen
        });
        //notify other views about selection change
        this.notifyPlayerSelection(selection);
    };

    notifyPlayerSelection = (selection) => {
        let selectedPlayers = [];
        for (let index of selection) {
            selectedPlayers.push(this.state.rows[index]);
        }
        if(selectedPlayers.length > 1){
            selectedPlayers.sort((a,b) => a.selectionIdx - b.selectionIdx);
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
                            defaultSorting={[{columnName: "Overall", direction: "desc"}]}
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
