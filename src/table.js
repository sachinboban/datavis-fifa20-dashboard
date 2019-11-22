import React from "react";
import Col from "react-bootstrap/Col";
import { Paper } from "@material-ui/core";
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
    TableFilterRow,
    TableSelection,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import {
    FilteringState,
    SortingState,
    IntegratedFiltering,
    IntegratedSorting,
    SelectionState,
    GroupingState,
    IntegratedGrouping,
} from '@devexpress/dx-react-grid';

class PlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.columnHeaders = ["Name", "Country", "Club", "League", "Position", "Overall"];
        this.columnWidths = [{ columnName: "Name", width: 200},{ columnName: "Country", width: 100},{ columnName: "Club", width: 150},
            { columnName: "League", width: 150}, { columnName: "Position", width: 100}, { columnName: "Overall", width: 100}
        ];
        this.state = {
            rows: [],
            columns: [],
            selection: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            let rows = this.props.data.slice();
            let columns = this.columnHeaders.map(col => {
                return {name: col, title: col}
            });
            this.setState({
                rows: rows,
                columns: columns,
                selection: []
            });
        }
    }

    onSelectionChange = (selection) => {
        this.setState({
            rows: this.state.rows,
            columns: this.state.columns,
            selection: selection
        });
        this.props.onSelectionChange(this.state.rows[selection[selection.length - 1]]);
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      console.log(this.props.data);
      let rows = this.props.data.slice();
      let columns = this.columnHeaders.map(col => {
        return { name: col, title: col };
      });
      this.setState({
        rows: rows,
        columns: columns,
        selection: []
      });
    }
  }
    render() {
        return (
            <Col>
                <Paper>
                    <Grid
                        rows={this.state.rows}
                        columns={this.state.columns}
                    >
                        <SortingState
                            defaultSorting={[{columnName: 'Name', direction: 'asc'}]}
                        />
                        <IntegratedSorting/>

                        <DragDropProvider/>
                        <GroupingState
                            defaultGrouping={[]}/>
                        <IntegratedGrouping/>
                        <FilteringState defaultFilters={[]}/>
                        <IntegratedFiltering/>
                        <SelectionState
                            selection={this.state.selection}
                            onSelectionChange={this.onSelectionChange}
                        />
                        <VirtualTable  columnExtensions={this.columnWidths}/>
                        <TableHeaderRow showSortingControls/>
                        <TableSelection selectByRowClick highlightRow/>
                        <TableGroupRow/>
                        <Toolbar/>
                        <GroupingPanel showGroupingControls showSortingControls/>
                        <TableFilterRow/>
                    </Grid>
                </Paper>
            </Col>
        );
    }
}

export default PlayerTable;
