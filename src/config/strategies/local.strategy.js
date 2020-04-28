const passport = require('passport');
const {Strategy} = require('passport-local');
const {MongoClient} = require('mongodb');  
const debug = require('debug')('app:localStorage.strategy');
  debug('asd');


module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        } ,(username , password , done) =>{
            const url = 'mongodb://localhost:27017';
            const dbname = 'Library';
            (async function mongo(){
                let client;
                try
                {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbname);
                    debug("Connected Baby!!");
                    const col = await db.collection('users');
                    const user = await col.findOne({username});
                    if(user.password===password)
                    {
                        done(null , user);
                    }
                    else{
                        done(null , false);
                    }
                }
                catch(err)
                {
                    debug(err);
                }
                client.close(); 
            }());
        }));
};
