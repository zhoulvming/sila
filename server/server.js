var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var sila = require('./routes/sila');
var user = require('./routes/user');
var accessSource = require('./routes/access-source');
var pageInfo = require('./routes/page-info');
var port = 3000;
var app = express();

// View Engine
app.set('views', path.join(__dirname, '../client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/sila', sila);
app.use('/user', user);
app.use('/accessSource', accessSource);
app.use('/pageInfo', pageInfo);

var server = 
  app.listen(port, function(){
    console.log('Server started on port ' + port);
  });

server.once('listening', function(){
  console.log('Server is running at http://127.0.0.1:3000/');
});