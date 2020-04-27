let express = require('express');
const authRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRouter');
let emai;


function router(){
    authRouter.route('/signup')
    .post((req,res)=>{
        debug(req.body);
         res.send(req.body);
        
    });
    return authRouter;
}

module.exports = router;