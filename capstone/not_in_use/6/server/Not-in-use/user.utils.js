
/**
 * Utility methods to handle tasks related to the Users object.
 *
 * @class UserUtils
 * @requires SubscriptionUtils
 */

const SubscriptionUtils = require('../subscription/subscription.utils');

const subscriptionUtils = new SubscriptionUtils();

class UserUtils {

/**
 * Returns user object for the passed username.
 *
 * @param {String} username - username to find
 * @param {Array} _users - all users
 * @return {object} - user object if found, else undefined.
 * @throws {Error} if arguments are not defined
 */
    getUserFromUsers(username, _users) {
        if (username && _users && _users.length) {
            return _users.find(item => username === item.username);
        }
        throw Error('Exception in UserUtils::getUserFromUsers');
    }

/**
 * Returns a subscription from the users.subscription array with
 *     <ul><li>users.subscription.url = passed url.</li></ul>
 *
 * @param {String} url - url of a subscription
 * @param {Array} userSubscriptions - all user subscriptions
 * @return {array} - array of subscription objects if found, else undefined.
 * @throws {Error} if arguments are not defined
 */
    retrieveUserSubscription(url, userSubscriptions) {
        if (url && userSubscriptions) {
            return userSubscriptions.find(item => item.url === url);
        }
        throw Error('Exception in UserUtils::retrieveUserSubscription');
    }

/**
 * Returns an article from the users.subscription array by
 * subscription url and article url.
 *
 * @param {String} subscriptionUrl - url of a subscription
 * @param {String} articleUrl - url of an article
 * @param {Array} userSubscriptions - all user subscriptions
 * @return {object} - user subscription object if found, else undefined.
 * @throws {Error} if arguments are not defined
 */
    retrieveUserArticle(subscriptionUrl, articleUrl, userSubscriptions) {
        if (subscriptionUrl && articleUrl && userSubscriptions) {
            let userSub = this.retrieveUserSubscription(subscriptionUrl, userSubscriptions);
            if (! userSub) {
                return undefined;
            }
            return userSub.items.find(userSubItem => userSubItem.link === articleUrl);
        }
        throw Error('Exception in UserUtils::retrieveUserArticle');
    }

/**
 * Add 'subscription' to 'user'.subscriptions.
 *
 * @param {Object} user - user object.
 * @param {Object} subscription - subscription object from subscription collection.
 * @return {Object} Updated user.
 * @throws {Error} if arguments are not defined
 */
    addSubscription(user, subscription) {
        if (user && subscription) {
            if (user.subscriptions.findIndex(item => item.url === subscription.url) === -1) {
                user.subscriptions.push({url: subscription.url, title: subscription.channel.title});
            }
            return;
        }
        throw Error('Exception in UserUtils::addSubscription');
    }

/**
 * Add subscription.channel to all user.subscription[].<br/>
 * Note that user.subscription.subscribed = true;
 *
 * @param {Object} user - user
 * @param {Array} allSubscriptions - all subscriptions
 * @return {Object} Updated user.
 * @throws {Error} if arguments are not defined
 */
    decorateUserSubscriptions(user, allSubscriptions) {
        if (user && allSubscriptions && allSubscriptions.length) {
            user.subscriptions.forEach((item) => {
                item.subscribed = true;
                let sub = subscriptionUtils.retrieveSubscription(item.url, allSubscriptions);
                if (sub) {
                    item.channel = sub.channel;
                }
            });
            return;
        }
        throw Error('Exception in UserUtils::decorateUserSubscriptions');
    }

/**
 * Decorate user.saved, which holds all saved articles by subscription.
 *
 * @param {object} user - user
 * @param {array} allSubscriptions - all subscriptions
 * @return {Object} Updated user.
 * @throws {Error} if arguments are not defined
 */
    decorateUserSaved(user, allSubscriptions) {
        if (user && allSubscriptions && allSubscriptions.length) {
            user.saved.forEach((item) => {
                let sub = subscriptionUtils.retrieveSubscription(item.url, allSubscriptions);
                if (sub) {
                    item.channel = sub.channel;
                }

                var userSubscription = this.retrieveUserSubscription(item.url, user.subscriptions);
                if (userSubscription) {
                    item.title = userSubscription.title;
                    item.subscribed = true;
                }
                else {
                    item.title = item.channel.title;
                    item.subscribed = false;
                }
            });
            return;
        }
        throw Error('Exception in UserUtils::decorateUserSaved');
    }

/**
 * Return the articles not read by the user, grouped by subscription.
 *
 * <p>Note that subscription object for which the user is subscribed, required additional properties:
 * <ul>
 *      <li>subscribed = true</li>
 *      <li>title = channel.title from subscription</li>
 * </ul>
 * </p>
 * <p>Performs the following:
 * <ul>
 * <li>1. Filter each subscription</li>
 * <li>2. Verify user is subscribed to this subscription</li>
 * <li>3. Set subscribed = true</li>
 * <li>4. Set title to User.subscription.title</li>
 * <li>5. Filter all articles in the subscription</li>
 * <li>6. Remove articles that have been read.</li>
 * <li>7. Remove articles that have been saved.</li>
 * <li>8. Remove subscription if there are no remaining articles</li>
 * <li>9. Return the list of subscriptions.
 * </ul>
 * </p>
 *
 * @param {object} user - user
 * @param {object} allSubscriptions - all subscriptions.
 * @return {array} - articles not read by the user, grouped by subscription.
 * @throws {Error} if arguments are not defined
 */
    createUnread(user, allSubscriptions) {
        let arr = allSubscriptions.filter(allSubItem => {       // 1
            let userSub = user.subscriptions.find(userSubItem => userSubItem.url === allSubItem.url);
            if (userSub) {                          // 2
                allSubItem.subscribed = true;       // 3
                allSubItem.title = userSub.title;   // 4

                allSubItem.items = allSubItem.items.filter(allSubArticle => {       // 5
                    if (this.retrieveUserArticle(allSubItem.url, allSubArticle.link, user.read)) {
                        return false;       // 6
                    }
                    if (this.retrieveUserArticle(allSubItem.url, allSubArticle.link, user.saved)) {
                        return false;       // 7
                    }
                    return true;
                });

                if (allSubItem.items.length < 1) {  // check for subscriptions without articles.
                    return false;       // 8
                }
                return true;    // keep this subscription
            }
            return false;
        });
        return arr;     // 9
    }

/**
 * Add an article to a subscription in a subscription group.
 *
 * @param {string} url - subscription url
 * @param {object} subscription_article - article to be added
 * @param {array} group - subscription group, ex user.read
 * @throws {Error} if arguments are not defined
 */
    addArticle(url, subscription_article, group) {
        if (url && subscription_article && group) {
            let sub = group.find(subItem => subItem.url === url);
            if (sub === undefined) {       // new subscription
                sub = {};
                sub.url = url;
                sub.items = [];
                sub.items.push(subscription_article);
                group.push(sub);
                return;
            }
            if (sub.items.findIndex(item => item.link === subscription_article.link) === -1) {
                sub.items.push(subscription_article);
            }
            return;
        }
        throw Error('Exception in UserUtils::addArticle');
    }

/**
 * Retrieve the subscription with all articles for a requested subscription.
 * <ul>
 * <li>Remove the articles that the user has already saved or read.</li>
 * <li>If there are no articles, return an object containing an empty array.</li>
 * </ul>
 * <p>Note that subscription object for which the user is subscribed, required additional properties:
 * <ul>
 *      <li>subscribed = true</li>
 *      <li>title = channel.title from subscription</li>
 * </ul>
 * </p>
 * <p>
 * If user.subscription object does not exist for this 'subscription',
 * <ul><li>subscribed = false, title = channel.title</li></ul>
 * </p>
 * <p>Performs the following:
 * <ul>
 * <li>1. Verify user is subscribed to this subscription</li>
 * <li>1a. Set subscribed = true</li>
 * <li>1b. Set title to User.subscription.title</li>
 * <li>2. If user is not subscribed to this subscription</li>
 * <li>2a. Set subscribed = false</li>
 * <li>2b. Set title to channel.title</li>
 * <li>3. Filter all articles in the subscription</li>
 * <li>4. Remove articles that have been read.</li>
 * <li>5. Remove articles that have been saved.</li>
 * <li>6. Return the subscription.
 * </ul>
 * </p>
 *
 * @param {object} _user - user
 * @param {object} _subscription - subscription
 * @return {object} - subscription with remaining articles.
 * @throws {Error} if arguments are not defined
 */
    retrieveSubscription(_user, _subscription) {
        if (_user == null || _subscription == null) {
            throw Error('Exception in UserUtils::retrieveSubscription');
        }
        let userSub = _user.subscriptions.find(item => item.url === _subscription.url);     // 1
        if (userSub) {
            _subscription.subscribed = true;        // 1a
            _subscription.title = userSub.title;    // 1b
        }
        else {                                                      // 2
            _subscription.subscribed = false;                       // 2a
            _subscription.title = _subscription.channel.title;      // 2b
        }
        _subscription.items = _subscription.items.filter(allSubArticle => {     // 3
            if (this.retrieveUserArticle(_subscription.url, allSubArticle.link, _user.read)) {
                return false;           // 4
            }
            if (this.retrieveUserArticle(_subscription.url, allSubArticle.link, _user.saved)) {
                return false;           // 5
            }
            return true;
        });

        let result = {};
        result.subscriptions = [];
        result.subscriptions.push(_subscription);       // 6
        return result;
    }

/**
 * Delete a user subscription.
 *
 * @param {object} _user - user
 * @param {string} url - url of the subscription to delete.
 * @return {object} - updated user
 * @throws {Error} if arguments are not defined
 */
    deleteSubscription(_user, url) {
        if (_user == null || url == null) {
            throw Error('Exception in UserUtils::deleteSubscription');
        }
        _user.subscriptions = _user.subscriptions.filter(sub => ! (url === sub.url));
    }

/**
 * Update the title with 'title' of a user subscription with url = 'url.
 *
 * @param {object} _user - user
 * @param {string} url - url of subscription whose title is to be updated
 * @param {string} title - title
 * @throws {Error} if arguments are not defined
 */
    updateSubscriptionTitle(_user, url, title) {
        if (_user == null || url == null || title == null) {
            throw Error('Exception in UserUtils::updateSubscriptionTitle');
        }
        _user.subscriptions.find((item) => {
            if (item.url === url) {
                item.title = title;
                return true;
            }
            return false;
        });
    }

/**
 * Delete an article.
 * <p>Articles are stored in user.saved or user.read, grouped by subscription.</p>
 * <p>The approach used here is to delete duplicates, if they exist.</p>
 *
 * @param {string} channel_url - subscription url
 * @param {string} article_url - article url
 * @param {array} group - subscription group, ex user.read
 * @return {array} - articles by subscription.
 * @throws {Error} if arguments are not defined
 */
    deleteArticle(channel_url, article_url, group) {
        if (channel_url == null || article_url == null || group == null) {
            throw Error('Exception in UserUtils::deleteArticle');
        }
        let result = group.filter(subItem => {
            if (subItem.url !== channel_url) {
                return true;
            }
            subItem.items = subItem.items.filter(item => {
                if (item.link === article_url) {
                    return false;
                }
                return true;
            });
            if (subItem.items.length < 1) {
                return false;
            }
            return true;
        });
        return result;
    }
}

module.exports = UserUtils;
