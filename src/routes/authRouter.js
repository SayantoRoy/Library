let express = require('express');
const authRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRouter');
const passport = require('passport');

function router(nav){
    authRouter.route('/signup')
    .post((req,res)=>{
        const {username , password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbname = 'Library';

        (async function users(){
            let client;
            try{
                client = await MongoClient.connect(url);
                const db = client.db(dbname);
                const col = db.collection('users');
                const user = {username , password};
                
                const result = await col.insertOne(user);
                debug(result.ops[0]);
                req.login(result.ops[0] , () =>{
                    res.redirect('/auth/profile');
                });
            }
            catch(err){
                debug(err);
            }
        }());
        
        
    });


    authRouter.route('/signin')
    .get((req, res)=>{
        res.render('signin' , {
            nav,
            title : "Sign In"
        });
    })
    .post(passport.authenticate('local' , {
        successRedirect:'/auth/profile',
        failureRedirect: '/'
    } )
    
    );
    

    authRouter.route('/profile')
    .all((req,res,next) =>{
        if(req.user)
        {
            next();
        }
        else
        {
            res.redirect('/auth/signin');
        }
    })
    .get((req,res)=>{
        debug(req.user);
        res.json(req.user);
    });

    authRouter.route('/logout')
    .get((req , res)=>{
        req.logout();
        res.redirect('/auth/signin');
    });
    return authRouter;
}

module.exports = router;