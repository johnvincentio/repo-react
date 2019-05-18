const MUSIC_DATA = {
	tree: {
		folder: {
			index: 0,
			dir: '/Users/jv/tmp/music/1',
			folders: [
				{
					folder: {
						index: 1,
						dir: '/Users/jv/tmp/music/1/Yoga',
						folders: [
							{
								folder: {
									index: 2,
									dir: '/Users/jv/tmp/music/1/Yoga/Donna De Lory',
									folders: [
										{
											folder: {
												index: 3,
												dir: '/Users/jv/tmp/music/1/Yoga/Donna De Lory/The Lover and the Beloved',
												folders: []
											}
										}
									]
								}
							},
							{ folder: { index: 4, dir: '/Users/jv/tmp/music/1/Yoga/Yoga Flow Mix 1 - Jala', folders: [] } }
						]
					}
				}
			]
		}
	},
	folders: [
		{ dir: '/Users/jv/tmp/music/1', files: [], jpgs: [] },
		{ dir: '/Users/jv/tmp/music/1/Yoga', files: [], jpgs: [] },
		{ dir: '/Users/jv/tmp/music/1/Yoga/Donna De Lory', files: [], jpgs: [] },
		{
			dir: '/Users/jv/tmp/music/1/Yoga/Donna De Lory/The Lover and the Beloved',
			files: [
				{
					file: '01 - Ganapati Om.mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 0,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'Ganapati Om',
						year: '2006'
					}
				},
				{
					file: '02 - Om Nama Shivaya.mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 1,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'Om Nama Shivaya',
						year: '2006'
					}
				},
				{
					file: '03 - He Ma Durga.mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 2,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'He Ma Durga',
						year: '2006'
					}
				},
				{
					file: '04 - Hare Krishna.mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 3,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'Hare Krishna',
						year: '2006'
					}
				},
				{
					file: '05 - Govinda Jaya Jaya.mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 4,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'Govinda Jaya Jaya',
						year: '2006'
					}
				},
				{
					file: '06 - Samba Sadashiva.mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 5,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'Samba Sadashiva',
						year: '2006'
					}
				},
				{
					file: '07 - Govinda Jaya Jaya (Mac Quayle Mix).mp3',
					obj: {
						folderIdx: 3,
						fileIdx: 6,
						album: 'The Lover and the Beloved',
						artist: 'Donna De Lory',
						genre: 'Dance & DJ',
						title: 'Govinda Jaya Jaya (Mac Quayle Mix)',
						year: '2006'
					}
				}
			],
			jpgs: [
				'AlbumArtSmall.jpg',
				'AlbumArt_{0EFF02BB-3396-4367-9494-7E62E8C74F12}_Large.jpg',
				'AlbumArt_{0EFF02BB-3396-4367-9494-7E62E8C74F12}_Small.jpg',
				'Folder.jpg'
			]
		},
		{
			dir: '/Users/jv/tmp/music/1/Yoga/Yoga Flow Mix 1 - Jala',
			files: [
				{
					file: '01 - Jala (Yoga Flow Mix).mp3',
					obj: {
						folderIdx: 4,
						fileIdx: 0,
						album: 'Yoga Flow Mix 1 - Jala',
						artist: 'Mixed by Yogitunes',
						genre: 'Dance & DJ',
						title: 'Jala (Yoga Flow Mix)',
						year: '2010'
					}
				}
			],
			jpgs: [
				'AlbumArtSmall.jpg',
				'AlbumArt_{27C941F4-7401-406B-B956-C13FDA1E13B4}_Large.jpg',
				'AlbumArt_{27C941F4-7401-406B-B956-C13FDA1E13B4}_Small.jpg',
				'Folder.jpg'
			]
		}
	]
};

export default MUSIC_DATA;
