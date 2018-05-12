/**
 * Handle routing related tasks
 *
 * @module routes
 * @requires express-jwt
 * @requires passport
 * @requires config
 * @requires errors
 * @requires path
 * @requires logger
 * @requires userNavigationRouter
 * @requires userArticleRouter
 * @requires userSubscriptionRouter
 * @requires rssRouter
 * @requires subscriptionRouter
 * @requires importRouter
 * @requires searchRouter
 * @requires contactRouter
 * @requires authRouter
 * @requires registerRouter
 * @requires resetRouter
 */

const jwt = require('express-jwt');

const passport = require('passport');

const contactRouter = require('../api/contact/contact.router');

const authRouter = require('../api/auth/auth.router');

const resetRouter = require('../api/reset/reset.router');

const registerRouter = require('../api/register/register.router');

const goalsRouter = require('../api/goals/goals.router');
const projectsRouter = require('../api/projects/projects.router');
const tasksRouter = require('../api/tasks/tasks.router');

const searchRouter = require('../api/search/search.router');

const { AUTHENTICATION_KEY, COOKIE_NAME, FACEBOOK_APP_ID, GOOGLE_APP_ID, HEAD_DATA } = require('./config');

// const { loginFacebook } = require('../api/auth/auth.controller');

const path = require('path');

const errors = require('./errors');
const { logger } = require('./logger');

// const EmailUtils = require('./email');

// const emailUtils = new EmailUtils();

// const randomstring = require('randomstring');

module.exports = app => {
	app.use(
		jwt({ secret: AUTHENTICATION_KEY }).unless(req => {
			const ok = [
				'/api/auth/login'

				// '/', // home page
				// '/terms-of-service',
				// '/privacy-policy', // other
				// '/api/contact/message', // home, contact us
				// '/dashboard', // SPA
				// '/assets', // css, js, images, fonts
				// '/favicon', // favicon
				// '/login',
				//
				// '/login/facebook',
				// '/auth/login/google', // user login
				// '/register',
				// '/user/register', // register new user
				// '/register/request-confirmation',
				// '/user/reset',
				// '/user/reset/changed', // reset user password
				// '/reset-password',
				// '/reset/request-confirmation',
				// '/reset/complete',
				// '/forget-cookie',
				// '/sitemap.xml',
				// '/google9104b904281bf3a3.html' // TODO; update this
			];
			if (ok.indexOf(req.url) > -1) {
				console.log('url ', req.url, 'is allowed');
				return true;
			}
			if (req.url.startsWith('/api/reset/')) {
				return true;
			}
			if (req.url.startsWith('/api/register/')) {
				return true;
			}
			if (req.url.startsWith('/api/contact/')) {
				return true;
			}

			// if (req.url.startsWith('/?')) {
			// 	return true;
			// }
			// if (req.url.startsWith('/user/register/')) {
			// 	return true;
			// }
			// if (req.url.startsWith('/user/reset/update/')) {
			// 	return true;
			// }
			// if (req.url.startsWith('/login/facebook/return')) {
			// 	return true;
			// }
			console.log('url ', req.url, 'is NOT allowed');
			return false;
		})
	);

	app.use('/api/goals', goalsRouter);
	app.use('/api/projects', projectsRouter);
	app.use('/api/tasks', tasksRouter);

	app.use('/api/search', searchRouter);

	app.use('/api/auth/login', authRouter);

	app.use('/api/reset', resetRouter);

	app.use('/api/register', registerRouter);

	app.use('/api/contact', contactRouter);

	// app.get('/', (req, res) => {
	// 	//        let home_url = `${req.protocol}://${req.get('host')}`;
	// 	if (req.url.startsWith('/?')) {
	// 		return res.redirect('/');
	// 	}
	// 	return res.render('pages/home/home', {
	// 		layout: 'main',
	// 		title: 'Feediator',
	// 		css: 'home/styles.css',
	// 		js: 'home/home.js',
	// 		head: HEAD_DATA
	// 	});
	// });

	// app.get('/dashboard', (req, res) =>
	// 	 res.render('pages/dashboard/dashboard', {
	// 		layout: false,
	// 		title: 'Feediator',
	// 		head: HEAD_DATA
	// 	})
	// );

	/* Handle User Login */

	// app.get('/login', (req, res) => res.render('pages/login/login', {
	// 	title: 'Feediator - Login',
	// 	css: 'login/styles.css',
	// 	js: 'login/login.js',
	// 	facebook_appid: FACEBOOK_APP_ID,
	// 	google_appid: GOOGLE_APP_ID,
	// 	isHeaderNoNav: 'true',
	// 	isJQuery: 'true',
	// 	isGoogleApis: 'true',
	// 	head: HEAD_DATA
	// }));

	/* Handle Facebook Login */

	// app.get('/login/facebook', passport.authenticate('facebook'));

	// app.get(
	// 	'/login/facebook/return',
	// 	passport.authenticate('facebook', { failureRedirect: '/login' }),
	// 	(req, res, next) => {
	// 		logger.info(`routes::/login/facebook/return; user.id ${  req.user.id}`);
	// 		return loginFacebook(req, res, next);
	// 	}
	// );

	/*
* Handle Register User
*/
	// app.get(
	// 	'/register',
	// 	(req, res) =>
	// 		res.render('pages/register/register', {
	// 			title: 'Feediator - Register',
	// 			css: 'login/styles.css',
	// 			js: 'login/register.js',
	// 			isHeaderNoNav: 'true',
	// 			isJQuery: 'true',
	// 			head: HEAD_DATA
	// 		})
	// 	// res.sendFile(path.join(__dirname + '/../views/login/register.html'));
	// );

	// app.get('/register/request-confirmation', (req, res) => res.render('pages/register/request-confirmation', {
	// 	title: 'Feediator - Almost Registered!',
	// 	css: 'common/styles.css',
	// 	js: 'login/empty.js',
	// 	isHeaderNoNav: 'true',
	// 	head: HEAD_DATA
	// }));

	/*
* Handle User Password Reset
*/
	// app.get('/reset-password', (req, res) => res.render('pages/reset-password/requested', {
	// 	title: 'Feediator - Password Reset',
	// 	css: 'login/styles.css',
	// 	js: 'login/reset-password.js',
	// 	isHeaderNoNav: 'true',
	// 	isJQuery: 'true',
	// 	head: HEAD_DATA
	// }));

	// app.get('/reset/request-confirmation', (req, res) => res.render('pages/reset-password/request-confirmation', {
	// 	title: 'Almost Registered!',
	// 	css: 'common/styles.css',
	// 	js: 'login/empty.js',
	// 	head: HEAD_DATA
	// }));

	// app.get('/reset/complete', (req, res) => res.render('pages/reset-password/complete', {
	// 	title: 'Password has been Updated',
	// 	css: 'common/styles.css',
	// 	js: 'login/empty.js',
	// 	isHeaderNoNav: 'true',
	// 	head: HEAD_DATA
	// }));

	/*
    * remove the cookie for better testing
    */
	// app.get('/forget-cookie', (req, res) => {
	// 	res.clearCookie(COOKIE_NAME);
	// 	res.send('cookie cleared');
	// });

	// app.get('/terms-of-service', (req, res) => res.render('pages/terms/terms', {
	// 	title: 'Feediator - Terms of Service',
	// 	css: 'common/styles.css',
	// 	isHeaderNoNav: 'true',
	// 	head: HEAD_DATA
	// }));
	// app.get('/privacy-policy', (req, res) => res.render('pages/privacy/privacy', {
	// 	title: 'Feediator - Privacy Policy',
	// 	css: 'common/styles.css',
	// 	isHeaderNoNav: 'true',
	// 	head: HEAD_DATA
	// }));

	// app.get('/google9104b904281bf3a3.html', (req, res) => {
	// 	logger.info('/google9104b904281bf3a3.html');
	// 	res.sendFile(path.join(`${__dirname}/../public/google9104b904281bf3a3.html`));
	// });

	// app.get('/sitemap', (req, res) => {
	// 	res.sendFile(path.join(`${__dirname  }/../public/sitemap.xml`));
	// });

	app.use('*', (req, res) => {
		res.status(404).json({ message: 'Not Found' });
	});
	//    app.all('*', (req, res, next) => {
	//        res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
	//    });
	app.use(errors);
};
