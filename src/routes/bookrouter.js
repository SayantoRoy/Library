let express = require('express');
const bookRouter = express.Router();
const {MongoClient , ObjectID} = require('mongodb');
const debug = require('debug')('app:adminRouter');

function routere(nav)
{
bookRouter.route('/')
.get((req ,res) => {
    
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
});


bookRouter.route('/:id')
.get((req , res) => {
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
        
    
});

return bookRouter;
}

module.exports = routere;