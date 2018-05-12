
/**
 * Handle tasks related to user subscriptions
 *
 * @module userSubscriptionController
 * @requires UserModel
 * @requires UserAccess
 * @requires UserUtils
 * @requires SubscriptionAccess
 * @requires logger
 */

const {logger} = require('../../../config/logger');

const {UserModel} = require('../user.model');

const UserAccess = require('../user.access');
let userAccess = new UserAccess();

const SubscriptionAccess = require('../../subscription/subscription.access');
let subscriptionAccess = new SubscriptionAccess();

const UserUtils = require('../user.utils');
let userUtils = new UserUtils();

var userSubscriptionController = {

/**
 * Return a user subscription with articles
 *
 * @method retrieveSubscription
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    retrieveSubscription(req, res) {
        logger.info("--- user/subscription.controller::retrieveSubscription; user "+req.user.username);

        let {url} = req.body;
        logger.debug("url :"+url+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getOneSubscription(url)])
        .then(values => {
            let _user = values[0];
            let _subscription = values[1];
            if (typeof _user === 'undefined' || _user === null) {
                res.status(204).json({message: `Record ${username} not found`});
                return;
            }

            res.json(userUtils.retrieveSubscription(_user, _subscription));
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    },
/**
 * Add a user subscription
 *
 * @method addSubscription
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    addSubscription(req, res) {
        logger.info("--- user/subscription.controller::addSubscription; user "+req.user.username);

        let {url} = req.body;
        logger.debug("url :"+url+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getOneSubscription(url)])
        .then(values => {
            let _user = values[0];
            let _subscription = values[1];
            if (typeof _user === 'undefined' || _user === null) {
                res.status(204).json({message: `Record ${username} not found`});
                return;
            }

            userUtils.addSubscription(_user, _subscription);

            UserModel.update({_id: _user._id},
                {$set: {subscriptions: _user.subscriptions}}, function(err) {
                if (err) {
                    logger.error("Cannot Add Subscription "+url+" from user "+username);
                    return res.status(500).json({message: "Cannot Add Subscription "+url+" from user "+username});
                }
                logger.info("Added Subscription "+url+" from user "+username);
                return res.status(200).json({message: `Subscription added`});
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    },

/**
 * Delete a user subscription
 *
 * @method deleteSubscription
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    deleteSubscription(req, res) {
        logger.info("--- user/subscription.controller::deleteSubscription; user "+req.user.username);

        let {url} = req.body;
        logger.debug("url :"+url+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id),
        ])
        .then(values => {
            let _user = values[0];
            if (typeof _user === 'undefined' || _user === null) {
                res.status(204).json({message: `Record ${username} not found`});
                return;
            }

            userUtils.deleteSubscription(_user, url);

            UserModel.update({_id: _user._id},
                {$set: {subscriptions: _user.subscriptions}}, function(err) {
                if (err) {
                    logger.error("Cannot Delete Subscription "+url+" from user "+username);
                    return res.status(500).json({message: "Cannot Delete Subscription "+url+" from user "+username});
                }
                logger.info("Deleted Subscription "+url+" from user "+username);
                return res.status(200).json({message: `Subscription deleted`});
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    },

/**
 * Update a user subscription title
 *
 * @method updateSubscriptionTitle
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    updateSubscriptionTitle(req, res) {
        logger.info("--- user/subscription.controller::updateSubscriptionTitle; user "+req.user.username);

        let {value, pk} = req.body;
        logger.debug("value :"+value+":");
        logger.debug("pk :"+pk+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id)
        ])
        .then(values => {
            let _user = values[0];
            if (typeof _user === 'undefined' || _user === null) {
                res.status(204).json({message: `Record ${username} not found`});
                return;
            }

            userUtils.updateSubscriptionTitle(_user, pk, value);

            UserModel.update({_id: _user._id},
                {$set: {subscriptions: _user.subscriptions}}, function(err) {
                if (err) {
                    logger.error("Cannot Add "+value+" to user "+username);
                    return res.status(500).json({message: "Cannot Add "+value+" to user "+username});
                }
                logger.info("Added "+value+" to user "+username);
                return res.status(200).json({message: `Subscription title updated`, url: pk});
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    }
};

module.exports = userSubscriptionController;
