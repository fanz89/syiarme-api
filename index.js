var Request = require("request");

var param = 'json='.concat(encodeURIComponent('{"date": "2017-11-09", "doDate": "2017-11-10", "alias":"pemudahijrah"}'));

Request.post({
    "headers": { "content-type": "application/x-www-form-urlencoded" },
    "url": "http://localhost:3000/api/user/get",
    "body": param
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});