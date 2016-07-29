var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var debug = require('debug')('Letters4Animals-master:server');
var http = require('http');
var models = require('./server/models');
var flash = require("connect-flash");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require('morgan');
var twilio = require('twilio')('AC774792db902431a6b6a506101c53c5ce','bb5f76ea5ce05b65fbada13aaff01ef8');

LocalStrategy = require('passport-local').Strategy;

// passport ///////////////////////////////////////
// app.use(morgan('dev')); // log every request to the console

app.use(cookieParser());
app.use(flash());
app.use(session({ secret: 'L4ASecret' }));
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport')(passport); // pass passport for configuration
////////////////////////////////////////////////////


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, './client')));
require('./server/config/routes.js')(app);

// app.use(app.router);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

models.sequelize.sync().then(function() {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

//RESET PASSWORD URL CHECKING IF THAT
var now = new Date();
models.User.findAll({attributes: ['id','first_name','last_name','reset_pw_url_created_at', 'reset_pw_url']}).then(function(data) {
    console.log('Checking All reset_pw_created_at');
    for (user of data) {
        if (user.dataValues.reset_pw_url_created_at) {
            var urlCreatedAt = user.dataValues.reset_pw_url_created_at;
            if (now.getTime()-urlCreatedAt.getTime() >= 86400000 || !urlCreatedAt) {
                console.log('User:',user.dataValues.first_name+' '+user.dataValues.last_name+"'s",'reset password url is expired. Deleting it.');
                user.update({reset_pw_url: null, reset_pw_url_created_at: null});
            }
        } else if(!user.dataValues.reset_pw_url || !user.dataValues.reset_pw_url_created_at){
            user.update({reset_pw_url: null, reset_pw_url_created_at: null});
        } else {
            user.update({reset_pw_url: null, reset_pw_url_created_at: null});
        };
    }
}).catch(function(err) {
    console.log(err);
})
models.Pendinguser.findAll({attributes: ['id','first_name','last_name','createdAt']}).then(function(data) {
    console.log('Checking All Pending Users');
    for (user of data) {
        if (user.dataValues) {
            if (now.getTime()-user.dataValues.createdAt.getTime() > 259200000) {
                console.log('Pending user:',user.dataValues.first_name,'has expired. Deleting');
                user.destroy().catch(function(err) {
                    console.log(err);
                })
            }
        }
    }
})
setInterval(function () {
    var now = new Date();
    models.User.findAll({attributes: ['id','first_name','last_name','reset_pw_url_created_at', 'reset_pw_url']}).then(function(data) {
        console.log('Checking All reset_pw_created_at');
        for (user of data) {
            if (user.dataValues.reset_pw_url_created_at) {
                var urlCreatedAt = user.dataValues.reset_pw_url_created_at;
                if (now.getTime()-urlCreatedAt.getTime() >= 86400000) {
                    console.log('User:',user.name+"'s",'reset password url is expired. Deleting it.');
                    user.update({reset_pw_url: null, reset_pw_url_created_at: null});
                }
            }
        }
    }).catch(function(err) {
        console.log(err);
    })
    //Deleting expired pendingusers
    models.Pendinguser.findAll({attributes: ['id','first_name','last_name','createdAt']}).then(function(data) {
        console.log('Checking All Pending Users');
        for (user of data) {
            if (user.dataValues) {
                if (now.getTime()-user.dataValues.createdAt.getTime() > 259200000) {
                    console.log('Pending user:',user.dataValues.first_name,'has expired. Deleting');
                    user.destroy().catch(function(err) {
                        console.log(err);
                    })
                }
            }
        }
    }).catch(function(err) {
        console.log(err);
    })
}, 43200000);
//Done with Checking Reset Password Url
