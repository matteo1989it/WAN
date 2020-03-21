// Connect to elasticsearch
var client = require('./Server/connection.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var apiTrafics = require('./Server/routes/apiTrafic');
var visitors = require('./Server/routes/visitor');
var app = express();
var port = 4200;

//view Engine 
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

//app.use(logger('dev'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

app.use('/visitors', express.static(path.join(__dirname, 'dist')));
app.use('/', visitors);
app.use('/apiTrafic', apiTrafics);

app.listen(port,function(){
    console.log('Server started on port'+ port);
});

module.exports = app;
