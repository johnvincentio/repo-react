
/**
 * Handle tasks related to user navigation
 *
 * @module userNavigationController
 * @requires UserAccess
 * @requires UserUtils
 * @requires SubscriptionAccess
 * @requires logger
 */

const {logger} = require('../../../config/logger');

const UserAccess = require('../user.access');
let userAccess = new UserAccess();

const SubscriptionAccess = require('../../subscription/subscription.access');
let subscriptionAccess = new SubscriptionAccess();

const UserUtils = require('../user.utils');
let userUtils = new UserUtils();

var userNavigationController = {

/**
 * Return user data for navigation in main app.
 * <p><ul>
 * <li>User subscriptions with articles</li>
 * <li>Unread Articles in user subscriptions</li>
 * <li>User Saved articles</li>
 * </ul></p>
 * @method getNavigation
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    getNavigation(req, res) {
        logger.info("--- navigation/navigation.controller::getNavigation; username "+req.user.username);

        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getAllSubscriptions()])
        .then(values => {
            let _user = values[0];
            let _subscriptions = values[1];
            if (typeof _user === 'undefined' || _user === null) {
                res.status(204).json({message: `Record ${req.user.username} not found`});
                return;
            }
            _user.password = null;

            userUtils.decorateUserSubscriptions(_user, _subscriptions);

            _user.unread = userUtils.createUnread(_user, _subscriptions);
            _user.read = [];

            userUtils.decorateUserSaved(_user, _subscriptions);

            res.json(_user);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    }
};

module.exports = userNavigationController;
