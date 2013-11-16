
/********************************
 * MODULE DEPENDENCIES
*********************************/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , manage = require('./routes/manage')
  , http = require('http')
  , path = require('path');
var lessMiddleWare = require('less-middleware');
var app = express();




/***************************************
 * CONFIGURATION FOR ALL ENVIRONMENTS
***************************************/
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req, res, next){
    app.locals.pretty = true;
    next();
})
app.use(app.router);
app.use(lessMiddleWare({
    src: __dirname + '/public',
    compress: true
}));
app.use(express.static(path.join(__dirname, '/public')));

/**********************************************
 * CONFIGURATION FOR DEVELOPMENT ENVIRONMENT
**********************************************/
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/**************************
*ROUTES
***************************/
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/users', user.list);
app.get('/login', manage.login);

/***************************
 * JSON API
****************************/
app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost)


/***************************
 * CREATE THE HTTP SERVER
 ***************************/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
