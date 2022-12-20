const request = require('request')
const { getFaceBookUserData } = require('./chatbot_utils')

//psid - page scoped id

// Sends response messages via the Send API
const callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: {"access_token": process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
  })
}

// Handles messages events
const handleMessage = (sender_psid, received_message) => {
    let response

    if (received_message.text) {    

        // Create the payload for a basic text message
        response = {
          "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }
    else if (received_message.attachments) {
        //get the payload.url
        let attachment_urls = []

        received_message.attachments.forEach(item =>{
            attachment_urls.push(item.payload.url)
        })

        //to respond with a structured message
        response = {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "generic",
                "elements": [{
                  "title": "Is this the right picture?",
                  "subtitle": "Tap a button to answer.",
                  "image_url": attachment_urls.length <= 0 ? '' : attachment_urls[0],
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "Yes!",
                      "payload": "yes",
                    },
                    {
                      "type": "postback",
                      "title": "No!",
                      "payload": "no",
                    }
                  ],
                }]
              }
            }
          }
    }

      // Sends the response message
    callSendAPI(sender_psid, response);    
}


// Handles messaging_postbacks events
const handlePostback = async (sender_psid, received_postback) => {
    let response

    let postback_payload = received_postback.payload

    if (postback_payload === 'yes') {
        response = {
            "text" : "thanks for responding the right way"
        }
    }
    else if (postback_payload === "no") {
        response = {
            "text": "bad response bro, try again later"
        }
    }
    else if (postback_payload === "GET_STARTED") {
      const userData = await getFaceBookUserData(sender_psid)
      response = {
        "text": `Welecome ${userData} to Restaurant Chat Bot Testing`
      }
    }

    callSendAPI(sender_psid, response)
}



module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI
}