const notification = async (req, res) => {
var axios = require('axios');
var data = JSON.stringify({
  "notification": {
    "title": `${req.body.title}`,
    "body": `${req.body.content}`,
    "click_action": "https://goangle-firebase.firebaseapp.com/",
    "priority": "high",
    "icon": "url ของ logo"
  },
  "to": `${req.body.token}`
});

var config = {
  method: 'post',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'key=AAAA2HckXBw:APA91bEcJtptiujx47PeI2wAxiMmItl5TgoPWp0tH4tc6fjqTAgv7z5m7IcHQJ69En94sBR1p0Rn4O98WBpFHu8hJpIjknKRr1jSCghfezP2iCyLuUvFDgrkfYHp_ldqyUfmG_Szz1gc'
  },
  data : data
};
console.log(data);
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  
    res.json(response.data);
})

.catch(function (error) {
  console.log(error);
});
}
module.exports = {
    notification
}