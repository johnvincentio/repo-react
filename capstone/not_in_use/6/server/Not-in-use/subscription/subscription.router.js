
/**
 * Handle tasks related to routing requests for user subscriptions
 *
 * @module userSubscriptionRouter
 * @requires express
 * @requires userSubscriptionController
 * @requires joi
 * @requires JVValidator
 */

const router = require('express').Router();

const {
    addSubscription, deleteSubscription,
    retrieveSubscription, updateSubscriptionTitle
} = require('./subscription.controller');

const Joi = require('joi');
const validator = require('../../../config/jv-validator.js')({Joi});

const schema = Joi.object({
    url: Joi.string().uri({scheme: ['http', 'https']}).required()
});
const titleSchema = Joi.object({
    name: Joi.string().allow('').optional(),        // x-editable requirement
    pk: Joi.string().uri({scheme: ['http', 'https']}).required(),
    value: Joi.string().required()
});
const joiOpts = {
    allowUnknown: false
};

router.route('/items').all(validator.body(schema, {joi: joiOpts})).post(retrieveSubscription);
router.route('/add').all(validator.body(schema, {joi: joiOpts})).post(addSubscription);
router.route('/delete').all(validator.body(schema, {joi: joiOpts})).post(deleteSubscription);
router.route('/title').all(validator.body(titleSchema, {joi: joiOpts})).post(updateSubscriptionTitle);

module.exports = router;
