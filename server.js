var express = require('express')
var app = express()

app.get('/*', function(req, res) {
    res.send(req.params[0])
})

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Server listening on port ' + port + '!')
})