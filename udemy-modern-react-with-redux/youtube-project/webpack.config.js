
const webpack = require('webpack');

// get from environment
const DEBUG = !(process.env.NODE_ENV === 'production');
console.log("DEBUG "+DEBUG);

require('dotenv').config();		// load from .env file

console.log("API_KEY "+process.env.API_KEY);

module.exports = {
	entry: [
		'./src/index.jsx',
	],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-1'],
			},
		}],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV', 'API_KEY']),
	],
	devServer: {
		historyApiFallback: true,
		contentBase: './',
	},
};
