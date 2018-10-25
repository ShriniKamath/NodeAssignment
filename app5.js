var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var express = require('express');
var app = express();
var links = []

var pageToVisit = "https://wiprodigital.com";


console.log("Visiting page " + pageToVisit);

function getLink(pageToVisit) {
    console.log("in getLink : ");
    request(pageToVisit, function (error, response, body) {
        if (error) {
            console.log("Error: " + error);
        }
        if (response.statusCode === 200) {
            var $ = cheerio.load(body);
            console.log("Status code: " + $('a').attr('href'));
            $('a').each(function () {
                var link = $(this).attr('href');
                if (link.indexOf("http") != -1 && links.indexOf(link) == -1) {
                    links.push(link);
                    console.log("link " + link);
                    if (link.indexOf(pageToVisit) != -1 && link != pageToVisit) {
                        getLink(link)
                    }
                }
            });
        }
    });
}

getLink(pageToVisit)
app.get("/plain", function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    try {
        var element = "";
        for (let index = 0; index < links.length; index++) {
            element = element + links[index] + "\n";
        }
        response.end(element)
    }
    catch (error) {
    }
});
// app.get("/xml", function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/xml' });
//     try {
//         var element = '<sitemap>';
//         for (let index = 0; index < links.length; index++) {
//             element = "<url> <loc>" + element + links[index] + "</loc> </url>";
//         }
//         element = element + '</sitemap>'
//         response.write(element);
//         response.end();
//     }
//     catch (error) {
//     }
// });
app.listen(3011, function () {
    console.log("hello App3");
})

