var express = require('express')
var app = express()
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test2';
var mongodb = require("mongodb");
var mongo = mongodb.MongoClient
var validUrl = require('valid-url');

app.get('/add/*', function (req, res) {
    var url = req.params[0]

    if (validUrl.isUri(url)) {
        mongo.connect(mongoUrl, function (err, db) {
            if (err) {
                return res.send(err);
            }
            var coll = db.collection('urls');
            var urlObj = { url: url }
            coll.insert(urlObj, function (err, data) {
                if (err) {
                    return res.send(err);
                }
            })
            var response = { url: req.headers.host + '/' + urlObj._id }
            res.json(JSON.stringify(response))

            db.close();
        })
    } else {
        var error = { error: 'Url seems to be invalid' }
        res.json(JSON.stringify(error))
    }
})

app.get('/:id(\\w+)/', function (req, res) {
    mongo.connect(mongoUrl, function (err, db) {
        if (err) {
            return res.send(err);
        }
        var coll = db.collection('urls');
        var urlObj = coll.findOne(mongodb.ObjectId(req.params.id), function (err, urlObj) {
            if (err) {
                return res.send(err);
            }
            res.redirect(urlObj.url)
        })

        db.close();
    })
})

var port = process.env.PORT || 8080
app.listen(port, function () {
    console.log('Server listening on port ' + port + '!')
})