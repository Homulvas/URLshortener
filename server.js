var express = require('express')
var app = express()
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test2';
var mongodb = require("mongodb");
var mongo = mongodb.MongoClient

app.get('/add/*', function (req, res) {
    var url = req.params[0]

    mongo.connect(mongoUrl, function (err, db) {
        if (err) {
            return console.log(err);
        }
        var coll = db.collection('test2');
        var testObj = { test: 'aa', bb: 'cc' }
        coll.insert(testObj, function (err, data) {
            if (err) {
                return console.log(err);
            }

            console.log(JSON.stringify(data));
        })
        coll.count({}, function (err, data) {
            if (err) {
                return console.log(err);
            }
            res.send({ resp: data })
        })

        db.close();
    })

})

var port = process.env.PORT || 8080
app.listen(port, function () {
    console.log('Server listening on port ' + port + '!')
})