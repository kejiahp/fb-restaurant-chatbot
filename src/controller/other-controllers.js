require('dotenv').config()
const request = require('request')

const getFacebookProfile = (_req, res) => {
    return res.render('profile.ejs')
}

const setUpFBprofile = (_req, res) => {
    const uri = "https://graph.facebook.com/v15.0/me/messenger_profile"

    const data = {
        "get_started": {
            "payload": "GET_STARTED"
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Talk to an agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Outfit suggestions",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Shop now",
                        "url": "https://www.originalcoastclothing.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ],
        "whitelisted_domains":[
            "https://fondible.com/",
        ]
          
          
    }

    request({
        uri,
        qs: {"access_token":process.env.PAGE_ACCESS_TOKEN},
        method: "POST",
        json: data
    }, (err, res, body)=>{
        if(!err){
            return res.status(200).json({
                message: "successful"
            })
        } else {
            return res.status(500).json({
                message: "server error occurred"
            })
        }
    })

    return res.json({
        message: "ok"
    })
}

module.exports = {
    getFacebookProfile,
    setUpFBprofile
}