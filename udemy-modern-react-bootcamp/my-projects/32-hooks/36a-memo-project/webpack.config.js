//

const path = require('path');
const webpack = require('webpack');

const WebpackManifestPlugin = require('webpack-manifest-plugin');

const { GenerateSW } = require('workbox-webpack-plugin');
// const SWPreCacheWebpackPlugin = require('sw-precache-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineSourcePlugin = require('html-webpack-inline-source-plugin');

const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const transforms = require('./transforms');

/*
 * Define types
 */

const CSS_ONLY = true;
const TYPESCRIPT_ENABLED = false;

/*
 * Define folders
 */

const INCLUDE_CSS_FOLDER = path.resolve(__dirname, './src');
const SCSS_SRC_FOLDER = path.resolve(__dirname, './src');
const SCSS_FOLDER = path.resolve(__dirname, './scss');

const SCSS_FONTS_FOLDER = path.resolve(__dirname, './scss/fonts');
const FONTS_FOLDER = path.resolve(__dirname, './src/fonts');
const ICONS_FOLDER = path.resolve(__dirname, './src/icons');
const IMAGES_FOLDER = path.resolve(__dirname, './src/images');

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

const entry = TYPESCRIPT_ENABLED ? ['./src/index.tsx'] : ['./src/index.jsx'];
if (! CSS_ONLY) entry.push('./scss/styles.scss');

const extensions = TYPESCRIPT_ENABLED ? ['.ts', 'tsx', '.js', '.jsx'] : ['.js', '.jsx'];

const config = {};
config.entry = entry;
config.resolve = { extensions };

console.log('config.entry ', config.entry);
console.log('config.resolve ', config.resolve);

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
		new TerserPlugin({
			// sourceMap: true
			terserOptions: {
				// ecma: 8,
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

const cssRules = [
	{
		test: /\.css$/,
		include: INCLUDE_CSS_FOLDER,
		exclude: [/node_modules/],
		use: ['style-loader', 'css-loader']
	}
];

/*
beware:
error: ValidationError: CSS Loader Invalid Options
cause: options should NOT have additional properties
solution: use older css-loader, v2.1.1
then able to use localIdentName:
*/
const scssRules = [
	{
		test: /\.(sass|scss)$/,
		include: SCSS_SRC_FOLDER,
		exclude: [SCSS_FOLDER, /node_modules/],
		use: ['style-loader', 'css-loader', 'sass-loader']
	},
	{
		test: /\.(sass|scss)$/,
		include: SCSS_FOLDER,
		exclude: [SCSS_SRC_FOLDER, /node_modules/],
		use: [
			{
				loader: MiniCssExtractPlugin.loader
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true
				// localIdentName: '[local]___[hash:base64:5]'
				}
			},
			{
				loader: 'sass-loader'
			}
		]
	},
	{
		test: /\.css$/,
		include: INCLUDE_CSS_FOLDER,
		exclude: [SCSS_SRC_FOLDER, /node_modules/],
		use: [
			MiniCssExtractPlugin.loader,
			{ loader: 'css-loader', options: { url: false, sourceMap: true }},
			{ loader: 'sass-loader', options: { sourceMap: true }}
		]
	}
];

const useCssRules = CSS_ONLY ? cssRules : scssRules;

config.module = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		...useCssRules,
		{
			test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			include: [SCSS_FONTS_FOLDER, FONTS_FOLDER, ICONS_FOLDER, IMAGES_FOLDER],
			loader: 'file-loader',
			options: {
				name: 'assets/[name].[ext]'
			}
		}
	]
};
console.log('rules ', config.module.rules);

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
	extractCSSBundle, // allow import file.css

	// copy assets
	new CopyWebpackPlugin({
		patterns: [
			{ from: SCSS_FONTS_FOLDER, to: 'fonts', noErrorOnMissing: true },
			{ from: FONTS_FOLDER, to: 'fonts', noErrorOnMissing: true },
			{ from: ICONS_FOLDER, to: 'icons', noErrorOnMissing: true },
			{ from: IMAGES_FOLDER, to: 'images', noErrorOnMissing: true },

			{ from: 'static/sitemap.xml', to: '.' },
			{ from: 'static/google9104b904281bf3a3.html', to: '.' },
			{ from: 'static/robots.txt', to: '.' },
			{ from: 'static/favicon_package', to: '.' }
		]
	})
];

if (PRODUCTION_MODE) {
	config.plugins = [
		...plugins,
		new WebpackManifestPlugin({
			fileName: 'asset-manifest.json' // Not to confuse with manifest.json
		}),
		new GenerateSW({
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
		port: 8230,
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
