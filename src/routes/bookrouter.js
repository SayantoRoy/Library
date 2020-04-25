let express = require('express');
const bookRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:adminRouter');

function routere(nav)
{
bookRouter.route('/')
.get((req ,res) => {
    (async function mongo(){
        let client;
        const url = 'mongodb://localhost:27017';
        const dbname = 'Library';
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
        res.render('bookSingle' , {
            nav,
            title:'Doki Doki',
            book : book[id]._id
    });
    
});

return bookRouter;
}

module.exports = routere;