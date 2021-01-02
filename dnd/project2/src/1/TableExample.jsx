/* eslint-disable import/prefer-default-export */

import React from 'react';
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core';

import { fetchData } from './fetchData.ts';
import { SortableHeader } from './SortableHeader';

export const TableExample = () => {
	const dataList = fetchData();
	return(
		<div>
			<Table>
				<SortableHeader/>
				<TableBody>
					{dataList.map((data) => (
						<TableRow>
							<TableCell>
								{data.name}
							</TableCell>
							<TableCell>
								{data.hours}
							</TableCell>
							<TableCell>
								{data.startDate.toDateString()}
							</TableCell>
							<TableCell>
								{data.department}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
