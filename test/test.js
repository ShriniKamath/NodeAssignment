var request = require('request');
var fs = require('fs');
var expect = require('chai').expect;
var app = require('../app');
var server = app.listen(3002, function () {
    console.log('Server running at http://127.0.0.1:3002/');
});
var pageToVisit = "https://wiprodigital.com";
app.getLink(pageToVisit);
describe("returns 200", function () {
    this.timeout(10000);

    it("Testing for /", function (done) {
        request.get({ url: 'http://127.0.0.1:3002/' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('Testing for product without params', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Parameters are missing');
            done();
        })
    });
    it('Testing for product with params for Bag in Black', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=bag&itemColor=Black' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('{"itemDesc":"bag","itemName":"WildCraft","itemPrice":"1200","itemColor":"Black"}\n');
            done();
        })
    });
    it('Testing for product with params has itemColor property', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=bag&itemColor=Black' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect({ itemColor: "Black" }).to.have.property('itemColor');
            done();
        })
    });
    it('Testing for product with params has itemDesc property', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=bag&itemColor=Black' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect({ itemDesc: "bag" }).to.have.property('itemDesc');
            done();
        })
    });
    it('Testing for product with params for shirt in red', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=shirt&itemColor=Red' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('{"itemDesc":"shirt","itemName":"Polo","itemPrice":"2000","itemColor":"Red"}\n{"itemDesc":"shirt","itemName":"Peter England","itemPrice":"2400","itemColor":"Red"}\n{"itemDesc":"shirt","itemName":"HRX","itemPrice":"1100","itemColor":"Red"}\n');
            done();
        })
    });
    it('Testing for product with params for description and color is missing', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=shirt' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Parameters are missing');
            done();
        })
    });
    it('Testing if desc is given wrong', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=tshirt&itemColor=blue' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('No match found');
            done();
        })
    });
    it('Testing if color is given wrong', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/products?itemDesc=shirt&itemColor=marron' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('No match found');
            done();
        })
    });
    it('Testing for get status for firstNonRepChar', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/firstNonRepChar' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        })
    });
    it('Testing for post for string malayalam for firstNonRepChar', function (done) {
        var string = "malayalam";
        request.post({ url: 'http://127.0.0.1:3002/firstNonRepChar', form: { myName: string } }, function (error, response, body) {
            // expect(response.statusCode).to.equal(200);
            expect(body).to.equal('First Non Repitative Charater is : y');
            done();
        });
    });
    it('Testing for post for string malaalam for firstNonRepChar', function (done) {
        var string = "malaalam";
        request.post({ url: 'http://127.0.0.1:3002/firstNonRepChar', form: { myName: string } }, function (error, response, body) {
            // expect(response.statusCode).to.equal(200);
            expect(body).to.equal('All are repeating letter');
            done();
        });
    });
    it('Testing for post if string is empty for firstNonRepChar', function (done) {
        var string = "";
        request.post({ url: 'http://127.0.0.1:3002/firstNonRepChar', form: { myName: string } }, function (error, response, body) {
            // expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Inputed string is empty');
            done();
        });
    });
    it('Testing for get status for saveContent', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/saveContent' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        })
    });
    it('Testing for post for string malayalam for saveConent', function (done) {
        var string = "This text is to save in the file. ";
        request.post({ url: 'http://127.0.0.1:3002/saveContent', form: { myContent: string } }, function (error, response, body) {
            expect(body).to.equal('Data has been saved in myContent.txt');
            done();
        });
    });
    it('Testing for post if string is empty for saveConent', function (done) {
        var string = "";
        request.post({ url: 'http://127.0.0.1:3002/saveContent', form: { myContent: string } }, function (error, response, body) {
            // expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Inputed string is empty');
            done();
        });
    });
    it('Testing for get status for plain', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/plain' }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('Testing for file has been created or not', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/plain' }, function (error, response, body) {
            fs.readFile('./plainText.txt',
                function (err, data) {
                    expect(err).to.not.exist;
                    done();
                });
        });
    });
    it('Testing for page to visit link(https://wiprodigital.com) is present or not', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/plain' }, function (error, response, body) {
            fs.readFile('./plainText.txt',
                function (err, data) {
                    expect(err).to.not.exist;
                    expect(data.toString()).to.be.a('string').that.includes("https://wiprodigital.com");
                    done();
                });
        });
    });
    it('Testing for page to visit link(https://wiprodigital.com/who-we-are/) is present or not', function (done) {
        request.get({ url: 'http://127.0.0.1:3002/plain' }, function (error, response, body) {
            fs.readFile('./plainText.txt',
                function (err, data) {
                    expect(err).to.not.exist;
                    expect(data.toString()).to.be.a('string').that.includes("https://wiprodigital.com/who-we-are");
                    done();
                });
        });
    });
    after('Ends the server', function (done) {
        server.close()
        done()
    })

});