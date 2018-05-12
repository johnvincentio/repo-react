/* eslint-disable object-curly-newline */
const UserDataJV = {
	goals: [
		{
			goalid: 1,
			title: 'Goal1',
			description: 'Goal1 description',
			status: 0,
			projects: [
				{
					projectid: 1,
					title: 'Project1',
					description: 'Goal1/Project1 description',
					status: 0,
					tasks: [
						{
							taskid: 11,
							title: 'Goal1/Project1/Task1',
							description: 'Goal1/Project1/Task1 description',
							tags: [],
							status: 50,
							start: { date: '2018-03-10' },
							starred: false,
							repeat: 50,
							interval: 3
						}
					]
				}
			]
		}
	]
};

const UserData = {
	goals: [
		{
			goalid: 1,
			title: 'Goal1 Title - very, very long',
			description: 'Goal1 description',
			status: 0,
			projects: [
				{
					projectid: 1,
					title: 'Project1-1',
					description: 'Goal1/Project1-1 description',
					status: 0,
					tasks: [
						{
							taskid: 11,
							title: 'Goal1/Project1-1/Task1',
							description: 'Goal1/Project1-1/Task1 description',
							tags: [],
							status: 50,
							starred: true,
							estimate: '3d',
							start: { date: '2018-03-10' }
						},
						{
							taskid: 12,
							title: 'Goal1/Project1-1/Task2',
							tags: ['Tag11'],
							status: 0,
							starred: false,
							repeat: 50,
							interval: 2
						},
						{
							taskid: 13,
							title: 'Goal1/Project1-1/Task3',
							tags: ['Tag11', 'Tag2'],
							status: 0,
							starred: false,
							estimate: '2w',
							actual: '3d',
							start: { date: '2018-03-01' },
							end: { date: '2018-03-04' }
						}
					]
				},
				{
					projectid: 2,
					title: 'Project1-2',
					description: 'Goal1/Project1-2 description',
					status: 60,
					tasks: [
						{
							taskid: 21,
							title: 'Goal1/Project1-2/Task1',
							tags: ['Tag11', 'Tag3', 'Beta'],
							status: 0,
							starred: true,
							estimate: '3h'
						},
						{
							taskid: 22,
							title: 'Goal1/Project1-2/Task2',
							tags: [],
							status: 0,
							starred: false,
							estimate: '1w 2d'
						},
						{
							taskid: 23,
							title: 'Goal1/Project1-2/Task3',
							tags: [],
							status: 0,
							starred: false
						}
					]
				}
			]
		},
		{
			goalid: 2,
			title: 'Goal2 Title - very, very long',
			status: 20,
			projects: [
				{
					projectid: 3,
					title: 'Project2-1',
					description: 'Goal2/Project2-1 description',
					status: 20,
					tasks: [
						{
							taskid: 31,
							title: 'Goal2/Project2-1/Task1',
							tags: ['Alpha', 'Tag3', 'Tag4'],
							status: 50,
							starred: false,
							start: { date: '2018-03-11', time: '8:30' },
							end: { date: '2018-03-11', time: '12:30' }
						},
						{ taskid: 32, title: 'Goal2/Project2-1/Task2', tags: [], status: 1000, starred: false },
						{ taskid: 33, title: 'Goal2/Project2-1/Task3', tags: [], status: 0, starred: false }
					]
				}
			]
		},
		{
			goalid: 3,
			title: 'Goal3 Title - very, very long',
			status: 10,
			projects: [
				{
					projectid: 4,
					title: 'Project3-1',
					description: 'Goal3/Project3-1 description',
					status: 10,
					tasks: [
						{
							taskid: 41,
							title: 'Goal3/Project3-1/Task1',
							tags: [],
							status: 0,
							starred: true
						},
						{ taskid: 42, title: 'Goal3/Project3-1/Task2', tags: [], status: 50, starred: false },
						{ taskid: 43, title: 'Goal3/Project3-1/Task3', tags: [], status: 0, starred: false }
					]
				}
			]
		}
	]
};

export default UserData;
