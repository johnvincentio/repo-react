//

import React from 'react';

import TablePagination from '@material-ui/core/TablePagination';

const Pagination = props => {
	return (
		<TablePagination
			component="div"
			count={this.handleChangeFilter(searchedVal).length}
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
	);
};

export default Pagination;
