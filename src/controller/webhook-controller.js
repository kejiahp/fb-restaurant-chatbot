const { handleMessage, handlePostback } = require('../../utils/messaging_utils');

require('dotenv').config()

const getWebhook = (req, res) => {
    
    /** UPDATE YOUR VERIFY TOKEN **/
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
    
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        res.status(200).send(challenge);
      
      } else {
        res.sendStatus(403);      
      }
    }
    else{
      res.sendStatus(403)
    }
};

/*
  {
  "object":"page",
  "entry":[
    {
      "id":"<PAGE_ID>",
      "time":1458692752478,
      "messaging":[
        {
          "sender":{
            "id":"<PSID>"
          },
          "recipient":{
            "id":"<PAGE_ID>"
          },

          ...
        }
      ]
    }
  ]
}
*/

const postWebhook = (req, res) => {  

    let body = req.body;
  
    if (body.object === 'page') {
      
      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      body.entry.forEach(function(entry) {
  
        let webhook_event = entry.messaging[0];

        //get the sender psid - page scoped id
        let sender_psid = webhook_event.sender.id
        
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message)
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback)
        }
      });

      res.status(200).send('EVENT_RECEIVED');
  
    } else {
      res.sendStatus(404);
    }
  
  };
  

module.exports = {
  postWebhook,
  getWebhook
}