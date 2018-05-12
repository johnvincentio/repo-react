
/**
 * Handle tasks related to user articles
 *
 * @module userArticleController
 * @requires UserAccess
 * @requires UserModel
 * @requires UserUtils
 * @requires SubscriptionAccess
 * @requires SubscriptionUtils
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

const SubscriptionUtils = require('../../subscription/subscription.utils');
let subscriptionUtils = new SubscriptionUtils();

var userArticleController = {

/**
 * Save an Article. Articles are saved in user.saved, grouped by subscription.
 *
 * @method saveArticle
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    saveArticle(req, res) {
        logger.info("--- user/article.controller::saveArticle; user "+req.user.username);

        let {channel_url, article_url} = req.body;
        logger.debug("channel_url :"+channel_url+":");
        logger.debug("article_url :"+article_url+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getOneSubscription(channel_url)])
        .then(values => {
            let _user = values[0];
            let _subscription = values[1];

            let subscription_article = subscriptionUtils.retrieveSubscriptionArticle(article_url, _subscription);
            if (subscription_article) {
                userUtils.addArticle(channel_url, subscription_article, _user.read);
                userUtils.addArticle(channel_url, subscription_article, _user.saved);
            }

            UserModel.update({_id: _user._id},
                {$set: {read: _user.read, saved: _user.saved}}, function(err) {
                if (err) {
                    logger.error("Cannot Save Article to user "+username);
                    return res.status(500).json({message: "Cannot Save Article to user "+username});
                }
                logger.info("Saved Article to user "+username);
                return res.status(200).json({message: `Article saved`});
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    },

/**
 * Article has been read. Articles that have been read are saved in user.read, grouped by subscription.
 *
 * @method articleHasBeenRead
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    articleHasBeenRead(req, res) {
        logger.info("--- user/article.controller::articleHasBeenRead; user "+req.user.username);

        let {channel_url, article_url} = req.body;
        logger.debug("channel_url :"+channel_url+":");
        logger.debug("article_url :"+article_url+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getOneSubscription(channel_url)])
        .then(values => {
            let _user = values[0];
            let _subscription = values[1];

            let subscription_article = subscriptionUtils.retrieveSubscriptionArticle(article_url, _subscription);
            if (subscription_article) {
                userUtils.addArticle(channel_url, subscription_article, _user.read);
            }

            UserModel.update({_id: _user._id},
                {$set: {read: _user.read}}, function(err) {
                if (err) {
                    logger.error("Cannot Add Read article to user "+username);
                    return res.status(500).json({message: "Cannot Read article to user "+username});
                }
                logger.info("Added Read article to user "+username);
                return res.status(200).json({message: `Read article added`});
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    },

/**
 * Delete a saved article.
 * <p><ul>
 * <li>Articles that have been read are stored in user.read, grouped by subscription.</li>
 * <li>Articles that have been saved are stored in user.save, grouped by subscription.</li>
 * <li>Remove this article from user.read and user.save.</li>
 * </ul></p>
 *
 * @method deleteArticle
 * @param {IncomingMessage} req - request
 * @param {ServerResponse} res - response
 */
    deleteArticle(req, res) {
        logger.info("--- user/article.controller::deleteArticle; user "+req.user.username);

        let {channel_url, article_url} = req.body;
        logger.debug("channel_url :"+channel_url+":");
        logger.debug("article_url :"+article_url+":");

        let username = req.user.username;

        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getOneSubscription(channel_url)])
        .then(values => {
            let _user = values[0];
            let _subscription = values[1];

            let resultRead = userUtils.deleteArticle(channel_url, article_url, _user.read);
            let resultSaved = userUtils.deleteArticle(channel_url, article_url, _user.saved);

            UserModel.update({_id: _user._id},
                {$set: {read: resultRead, saved: resultSaved}}, function(err) {
                if (err) {
                    logger.error("Cannot Delete article from user "+username);
                    return res.status(500).json({message: "Cannot Delete article from user "+username});
                }
                logger.info("Deleted article from user "+username);
                return res.status(200).json({message: `Article deleted`});
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
    }
};

module.exports = userArticleController;
