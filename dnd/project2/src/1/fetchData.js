
/* eslint-disable import/prefer-default-export */

// export enum Department {
// 	Marketing = 'Marketing',
// 	Sales = 'Sales',
// 	Engineering = 'Engineering',
// }

// interface TableData {
// 	name: String,
// 	hours: number,
// 	startDate: Date,
// 	department: Department
// }

// let obj = {
//   x: 10,
//   y: [20, 30],
//   z: {
//     a:
//       {  b: 42 }
//   }
// } as const;

const dataList = [
	{ name: 'Ryan H.',   hours: 30, startDate: new Date('2019-01-14'), department: 'Marketing' },
	{ name: 'Ariel P.',  hours: 22, startDate: new Date('2017-03-12'), department: 'Sales' },
	{ name: 'Ryan Y.',   hours: 31, startDate: new Date('2015-09-12'), department: 'Marketing' },
	{ name: 'Ed T.',     hours: 22, startDate: new Date('2017-03-12'), department: 'Engineering' },
	{ name: 'Matt G.',   hours: 30, startDate: new Date('2017-03-12'), department: 'Marketing' },
	{ name: 'Olivia H.', hours: 32, startDate: new Date('2018-05-10'), department: 'Engineering' }
];

export const fetchData = () => dataList;
