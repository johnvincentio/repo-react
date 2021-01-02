/* eslint-disable import/prefer-default-export */

import React from 'react';

import { TableHead, TableRow, TableCell } from '@material-ui/core';

const SortableHeader = () => (
	<TableHead>
		<TableRow>
			<TableCell>Name</TableCell>
			<TableCell>Hours</TableCell>
			<TableCell>Date</TableCell>
			<TableCell>Department</TableCell>
		</TableRow>
	</TableHead>
);

export default SortableHeader;
