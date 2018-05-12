
/**
 * Handle tasks related to routing requests for user articles
 *
 * @module userArticleRouter
 * @requires express
 * @requires userArticleController
 * @requires joi
 * @requires JVValidator
 */

const router = require('express').Router();

const {saveArticle, articleHasBeenRead, deleteArticle} = require('./article.controller');

const Joi = require('joi');
const validator = require('../../../config/jv-validator.js')({Joi});

const schema = Joi.object({
    channel_url: Joi.string().uri({scheme: ['http', 'https']}).required(),
    article_url: Joi.string().uri({scheme: ['http', 'https']}).required()
});
const joiOpts = {
    allowUnknown: false
};

router.route('/save').all(validator.body(schema, {joi: joiOpts})).post(saveArticle);
router.route('/dismiss').all(validator.body(schema, {joi: joiOpts})).post(articleHasBeenRead);
router.route('/delete').all(validator.body(schema, {joi: joiOpts})).post(deleteArticle);

module.exports = router;
