var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var links = []
var pageToVisit = "https://wiprodigital.com";
var product_Details = [
    {
        itemDesc: "shirt",
        itemName: "Polo",
        itemPrice: "2000",
        itemColor: "Red"
    },
    {
        itemDesc: "shirt",
        itemName: "Polo",
        itemPrice: "2000",
        itemColor: "Yellow"
    },
    {
        itemDesc: "shirt",
        itemName: "Polo",
        itemPrice: "2000",
        itemColor: "Blue"
    },
    {
        itemDesc: "shirt",
        itemName: "Peter England",
        itemPrice: "2400",
        itemColor: "Red"
    },
    {
        itemDesc: "shirt",
        itemName: "Peter England",
        itemPrice: "2400",
        itemColor: "Yellow"
    },
    {
        itemDesc: "shirt",
        itemName: "Peter England",
        itemPrice: "2400",
        itemColor: "Black"
    },

    {
        itemDesc: "shirt",
        itemName: "HRX",
        itemPrice: "1100",
        itemColor: "Red"
    },
    {
        itemDesc: "shirt",
        itemName: "HRX",
        itemPrice: "1100",
        itemColor: "Blue"
    },
    {
        itemDesc: "shirt",
        itemName: "HRX",
        itemPrice: "1100",
        itemColor: "Yellow"
    },
    {
        itemDesc: "bag",
        itemName: "WildCraft",
        itemPrice: "600",
        itemColor: "Red"
    },
    {
        itemDesc: "bag",
        itemName: "WildCraft",
        itemPrice: "600",
        itemColor: "Yellow"
    },
    {
        itemDesc: "bag",
        itemName: "WildCraft",
        itemPrice: "600",
        itemColor: "Blue"
    },
    {
        itemDesc: "bag",
        itemName: "HP",
        itemPrice: "1600",
        itemColor: "Yellow"
    },
    {
        itemDesc: "bag",
        itemName: "HP",
        itemPrice: "1600",
        itemColor: "Blue"
    },
    {
        itemDesc: "bag",
        itemName: "HP",
        itemPrice: "1600",
        itemColor: "Red"
    },
    {
        itemDesc: "bag",
        itemName: "Cello",
        itemPrice: "1200",
        itemColor: "Yellow"
    },
    {
        itemDesc: "bag",
        itemName: "Cello",
        itemPrice: "1200",
        itemColor: "Blue"
    },
    {
        itemDesc: "bag",
        itemName: "Cello",
        itemPrice: "1200",
        itemColor: "Red"
    },
    {
        itemDesc: "bag",
        itemName: "WildCraft",
        itemPrice: "1200",
        itemColor: "Black"
    },
]
var linkString = ""
getLink = function (pageToVisit) {
    // console.log("getLink: ");

    request(pageToVisit, function (error, response, body) {
        if (error) {
            console.log("Error: " + error);
        }
        if (response.statusCode === 200) {
            var $ = cheerio.load(body);
            $('a').each(function () {
                var link = $(this).attr('href');
                if (link.indexOf("http") != -1 && links.indexOf(link) == -1) {
                    links.push(link);
                    linkString = linkString + link + "\n";
                    //  console.log("link " + link);
                    if (link.indexOf(pageToVisit) != -1 && link != pageToVisit) {
                        //console.log("link " + link);
                        getLink(link)
                    }
                }
            });

        }
        fs.writeFile("./plainText.txt", linkString, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
    return null;
}

function firstNonRepChar(string) {
    if (string != "") {
        for (var i = 0; i < string.length; i++) {
            var c = string.charAt(i);
            if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
                return "First Non Repitative Charater is : " + c;
            }
        }
        return "All are repeating letter";
    }
    else
        return "Inputed string is empty";
}

app.use(bodyParser());
getLink(pageToVisit);
app.get("/", function (request, response) {
    response.sendFile("index.html", { root: path.join(__dirname, "/") })
});
app.get("/product", function (request, response) {
    response.sendFile("product.html", { root: path.join(__dirname, "/") })
});
app.get("/products", function (request, response) {
    //  console.log(request.query, "===", request.query.itemDesc, "===", request.query.itemColor)
    if (request.query.itemDesc != undefined && request.query.itemColor != undefined) {
        var tempDisplay = "";
        product_Details.map(element => {
            //console.log(element.itemDesc, "==", request.query.itemDesc, "==", element.itemColor, "==", request.query.itemColor)
            if (element.itemDesc == request.query.itemDesc && element.itemColor == request.query.itemColor) {
                tempDisplay = tempDisplay + (JSON.stringify(element)) + "\n";
            }
        });
        // product_Details.map(element => {
        //     //console.log(element.itemDesc, "==", request.query.itemDesc, "==", element.itemColor, "==", request.query.itemColor)
        //     if (element.itemDesc == request.query.itemDesc && element.itemColor == request.query.itemColor) {
        //         tempDisplay = tempDisplay + (JSON.stringify(element.itemName)) + "\n";
        //         tempDisplay = tempDisplay + (JSON.stringify(element.itemPrice)) + "\n";
        //         tempDisplay = tempDisplay + (JSON.stringify(element.itemColor)) + "\n";
        //         tempDisplay = tempDisplay + "===========================" + "\n";
        //     }
        // });
        if (tempDisplay != "")
            response.end(tempDisplay)
        else
            response.end("No match found")
    } else {
        response.end("Parameters are missing")

    }
});
app.get("/firstNonRepChar", function (request, response) {
    response.sendFile("firstNonRepChar.html", { root: path.join(__dirname, "/") })
});
app.get("/saveContent", function (request, response) {
    response.sendFile("saveContent.html", { root: path.join(__dirname, "/") })
});

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
        if (request.body.myContent != "") {
            fs.writeFile("./MyContent.txt", request.body.myContent, function (err) {
                if (err) {
                    return console.log(err);
                }
                response.end("Data has been saved in myContent.txt");
            });
        } else {
            response.end("Inputed string is empty");
        }
    }
    catch (error) {
    }
});
// app.get("/plain", function (request, response) {
//     //response.sendFile("saveContent.html", { root: path.join(__dirname, "/") })
//     fs.writeFile("./plainText.txt", linkString, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//        console.log("Data has been saved in plainText.txt\n " );
//     });
// });
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

module.exports = app;

