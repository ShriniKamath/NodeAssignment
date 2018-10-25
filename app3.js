var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

function firstNonRepChar(string) {
    for (var i = 0; i < string.length; i++) {
        var c = string.charAt(i);
        if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
            return c;
        }
    }
    return null;
}
app.use(bodyParser());
app.post('/firstNonRepChar', function (request, response) {
    //console.log(request.params)
    try {
        response.end(firstNonRepChar(request.body.myName))
    }
    catch (error) {
    }
});
app.post('/saveContent', function (request, response) {
    //console.log(request.params)
    try {
        response.end(firstNonRepChar(request.body.myContent))
    }
    catch (error) {
    }
});
app.get("/", function (request, response) {
    response.sendFile("index.html", { root: path.join(__dirname, "/") })
});
app.listen(3011, function () {
    console.log("hello App3");
})
