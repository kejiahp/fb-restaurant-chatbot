require('dotenv').config()
const request = require('request')

const getFaceBookUserData = (sender_psid) => {
    return new Promise((resolve, reject) => {

        const uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`
  
        request({
        uri,
        method: "GET",
        }, (err, res, body)=>{
        if (!err) {
            body = JSON.parse(body)
            let username = `${body.last_name} ${body.first_name}`
            resolve(username)
        } else {
            reject(err)
        }
        })
    })
}

// const welcomeCustomer = (username, sender_psid) => {
//     return new Promise((resolve, reject) => {

//     })
// }

module.exports = {
    getFaceBookUserData,
    welcomeCustomer
}