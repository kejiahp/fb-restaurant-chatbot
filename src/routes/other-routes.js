const { getFacebookProfile, setUpFBprofile } = require('../controller/other-controllers')

const routes = require('express').Router()

routes.get('/', getFacebookProfile)
routes.post('/setup-user-fb-profile', setUpFBprofile)

module.exports = routes