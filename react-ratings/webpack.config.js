//

const path = require('path');
const webpack = require('webpack');

const WebpackManifestPlugin = require('webpack-manifest-plugin');
const SWPreCacheWebpackPlugin = require('sw-precache-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyWebpackPluginOptions = 'warning'; // info, debug, warning

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const transforms = require('./transforms');

/*
 * Define folders
 */

const ICONS_FOLDER = path.resolve(__dirname, './src/assets/icons');
const DIST_FOLDER = path.resolve(__dirname, './dist');

/*
 * Define plugins
 */

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

const extractSCSSBundle = new MiniCssExtractPlugin({
	filename: '[name].[contenthash].css',
	chunkFilename: '[id].[contenthash].css'
});

const extractCSSBundle = new MiniCssExtractPlugin({
	filename: '[name].css'
});

/*
 * Define production mode
 */

// console.log('webpack; node-env ', process.env.NODE_ENV);
const PRODUCTION_MODE = process.env.NODE_ENV === 'production';
// console.log('webpack; PRODUCTION_MODE ', PRODUCTION_MODE);

/*
 * Define entry points
 */

const config = {};

config.entry = ['./src/index.jsx'];

config.resolve = {
	extensions: ['.js', '.jsx']
};

/*
 * Define optimization
 */

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

/*
 * Define rules
 */

config.module = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.(sass|scss)$/,
			exclude: [/node_modules/],
			use: ['style-loader', 'css-loader', 'sass-loader']
		},
		{
			test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			// include: [FONTS_FOLDER, ICONS_FOLDER],
			include: [ICONS_FOLDER],
			loader: 'file-loader?name=assets/[name].[ext]'
		}
	]
};

/*
 * Define plugins
 */

const plugins = [
	// new CleanWebpackPlugin([DIST_FOLDER]),

	// list all React app required env variables
	new webpack.EnvironmentPlugin(['HOME_URL', 'NODE_ENV', 'GOOGLE_APP_ID']),

	HTMLPlugin,
	// new InlineSourcePlugin(),

	extractSCSSBundle, // create css bundle from scss
	extractCSSBundle // allow import file.css

];

if (PRODUCTION_MODE) {
	config.plugins = [
		...plugins,
		new WebpackManifestPlugin({
			fileName: 'asset-manifest.json' // Not to confuse with manifest.json
		}),
		new SWPreCacheWebpackPlugin({
			// By default, a cache-busting query parameter is appended to requests
			// used to populate the caches, to ensure the responses are fresh.
			// If a URL is already hashed by Webpack, then there is no concern
			// about it being stale, and the cache-busting can be skipped.
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					return;
				}
				console.log(message);
			},
			minify: true, // minify and uglify the script
			navigateFallback: '/index.html',
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
		})
	];
}

if (!PRODUCTION_MODE) {
	config.plugins = [...plugins];
}

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
		publicPath: '/',
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js'
	};

	config.mode = 'development';
	config.devtool = 'inline-source-map';

	config.devServer = {
		contentBase: DIST_FOLDER,
		compress: false,
		// inline: true,
		port: 8103,
		clientLogLevel: 'info',
		historyApiFallback: true,
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
