//

const path = require('path');
const webpack = require('webpack');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const transforms = require('./transforms');

const ICONS_FOLDER = path.resolve(__dirname, './icons');

const DIST_FOLDER = path.resolve(__dirname, './dist');
const INCLUDE_CSS_FOLDER = path.resolve(__dirname, './src');

const HTMLPlugin = new HtmlWebpackPlugin({
	template: './templates/index.hbs',
	file: './index.html',
	hash: false,
	chunksSortMode: 'none',
	// inlineSource: 'manifest~.+\\.js',
	HOME_URL: transforms.HOME_URL,
	TITLE: transforms.TITLE,
	DESCRIPTION: transforms.DESCRIPTION,
	KEYWORDS: transforms.KEYWORDS,
	AUTHOR: transforms.AUTHOR,
	AUTHOR_IMAGE: transforms.AUTHOR_IMAGE,
	TWITTER_USERNAME: transforms.TWITTER_USERNAME,
	GOOGLE_PROFILE: transforms.GOOGLE_PROFILE,
	GOOGLE_SITE_VERIFICATION: transforms.GOOGLE_SITE_VERIFICATION,
	GOOGLE_ANALYTICS_UA: transforms.GOOGLE_ANALYTICS_UA,
	GOOGLE_ANALYTICS_URL: transforms.GOOGLE_ANALYTICS_URL,
	FACEBOOK_APP_ID: transforms.FACEBOOK_APP_ID
});

const extractCSSBundle = new MiniCssExtractPlugin({
	filename: '[name].css'
});

// console.log('webpack; node-env ', process.env.NODE_ENV);
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';
// console.log('webpack; PRODUCTION_MODE ', PRODUCTION_MODE);

const config = {};

config.entry = ['./src/index.jsx'];

config.optimization = {
	splitChunks: {
		cacheGroups: {
			commons: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				chunks: 'initial'
			}
		}
	},
	runtimeChunk: {
		name: 'manifest'
	},
	minimizer: [
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				ecma: 8,
				mangle: false,
				keep_classnames: true,
				keep_fnames: true
			}
		})
	]
};

config.plugins = [
	// list all React app required env variables
	new webpack.EnvironmentPlugin(['NODE_ENV', 'GOOGLE_APP_ID']),

	HTMLPlugin,
	extractCSSBundle
];

config.module = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.css$/,
			include: INCLUDE_CSS_FOLDER,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				{ loader: 'css-loader', options: { url: false, sourceMap: true } },
				{ loader: 'sass-loader', options: { sourceMap: true } }
			]
		},
		{
			test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			// include: [FONTS_FOLDER, ICONS_FOLDER],
			include: [ICONS_FOLDER],
			loader: 'file-loader?name=assets/[name].[ext]'
		}
	]
};

config.resolve = {
	extensions: ['.js', '.jsx']
};

if (PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: '/',
		chunkFilename: '[name].[chunkhash].bundle.js',
		filename: '[name].[chunkhash].bundle.js'
	};
	config.mode = 'production';
	config.devtool = 'cheap-module-source-map';
}

if (!PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js'
	};

	config.mode = 'development';
	config.devtool = 'inline-source-map';

	config.devServer = {
		contentBase: DIST_FOLDER,
		compress: false,
		// inline: true,
		port: 8002,
		clientLogLevel: 'info',
		proxy: {
			'/api/**': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false
			}
		}
	};
}

module.exports = config;

/*
		{
			test: /\.ddcss$/,
			exclude: /node_modules/,
			loader: extractCSSBundle
		},
*/
