
const {MongoClient , ObjectID} = require('mongodb');
const debug = require('debug')('app:bookControlers');



module.exports = function doki(goodService , nav){


    function getIndex(req ,res) {
    
        const url = 'mongodb://localhost:27017';
        const dbname = 'Library';
        (async function mongo(){
            let client;
            try
            {
                client = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
                const db = client.db(dbname);
                debug("Connected Baby!!");
                const col = await db.collection('book');
                const book = await col.find().toArray();
                res.render('bookListView' , {
                    nav,
                    title:'Doki Doki',
                    book
                });
            }
            catch(err){
                debug('Error My Friend!!');
            }
            client.close();
        }());
    };

    function getID(req , res) {
        const {id} = req.params;
        const url = 'mongodb://localhost:27017';
        const dbname = 'Library';
        (async function mongo(){
            let client;
            try
            {
                client = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
                const db = client.db(dbname);
                debug("Connected Baby!!");
                const col = await db.collection('book');
                let book = await col.findOne({_id:new ObjectID(id)});
    
                book.details = await goodService.getbyID(book.bookId);
                res.render('bookSingle' , {
                    nav,
                    title:'Doki Doki',
                    book 
            });
            }
            catch(err)
            {
                debug("Error My Friend!!");
            }
            client.close();
        }());
            
        
    }

    function middleware(req,res,next){
        if(req.user)
        {
            next();
        }
        else
        {
            res.redirect('/auth/signin');
        }
    }

    return {
        getIndex,
        getID,
        middleware
    }
}