
/**
 * Handle tasks related to routing requests for user navigation
 *
 * @module userNavigationRouter
 * @requires express
 * @requires userNavigationController
 */

const router = require('express').Router();
const {getNavigation} = require('./navigation.controller');

router.route('/').post(getNavigation);

module.exports = router;
