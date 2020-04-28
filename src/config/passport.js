const passport = require('passport');
require('./strategies/local.strategy')();


const debug = require('debug')('app:passport');

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user , done) =>{
        debug("Serial");
        done(null , user);
    });

    passport.deserializeUser((user , done) =>{
        debug("Deserial");
        done(null , user);
    });

  
};