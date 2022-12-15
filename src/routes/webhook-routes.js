const { getWebhook, postWebhook } = require('../controller/webhook-controller')

const routes = require('express').Router()

routes.route('/').get(getWebhook).post(postWebhook)

module.exports = routes