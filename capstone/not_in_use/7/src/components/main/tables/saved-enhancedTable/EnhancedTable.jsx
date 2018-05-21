import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableFooter, TablePagination, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

import { tableHeadersType } from '../../../../types';

const styles = theme => ({
	root: {
		width: '100%'
		// marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 800
	},
	tableWrapper: {
		overflowX: 'auto'
	}
});

class EnhancedTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		const { tableData, rowsPerPage } = props;

		this.state = {
			order: 'asc',
			orderBy: 'id',
			selected: [],
			data: tableData,
			page: 0,
			rowsPerPage
		};
	}

	componentWillReceiveProps(nextProps) {
		// console.log('EnhancedTable::componentWillReceiveProps; nextProps ', nextProps);
		this.setState({ data: nextProps.tableData });
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		const data =
			order === 'desc'
				? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
				: this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

		this.setState({ data, order, orderBy });
	};

	handleSelectAllClick = (event, checked) => {
		if (checked) {
			this.setState({ selected: this.state.data.map(n => n.id) });
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		this.setState({ selected: newSelected });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const { classes, tableHeaders } = this.props;
		const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<EnhancedTableHead
							tableHeaders={tableHeaders}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
								const isSelected = this.isSelected(n.id);
								return (
									<TableRow
										hover
										onClick={event => this.handleClick(event, n.id)}
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelected} />
										</TableCell>
										{tableHeaders.map(header => (
											<TableCell padding="none" key={`table-${n.id}-${header.id}`}>
												{n[header.id]}
											</TableCell>
										))}
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									colSpan={6}
									count={data.length}
									rowsPerPage={rowsPerPage}
									page={page}
									backIconButtonProps={{
										'aria-label': 'Previous Page'
									}}
									nextIconButtonProps={{
										'aria-label': 'Next Page'
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Paper>
		);
	}
}

EnhancedTable.propTypes = {
	tableHeaders: tableHeadersType.isRequired,
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(EnhancedTable);
