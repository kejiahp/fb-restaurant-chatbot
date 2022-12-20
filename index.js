require('dotenv').config()
const express = require('express')
const webhookRoutes = require('./src/routes/webhook-routes')
const otherRoutes = require('./src/routes/other-routes')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('./src/public'))
app.set('view engine','ejs')
app.set('views','./src/views')


app.get('/',(_req, res)=>{
    res.render('homepage.ejs')
})

//webhook routes
app.use('/webhook',webhookRoutes)
app.use('/profile',otherRoutes)


const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})

//TESTING THE WEBHOOKS GET ROUTE
//curl -X GET "localhost:5000/webhook?hub.verify_token=b935a98dc6d944dfae7d094a64c259b5&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

//TESTING THE WEBHOOKS POST ROUTE
//curl -H "Content-Type: application/json" -X POST "localhost:5000/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'