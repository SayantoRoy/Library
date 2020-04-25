let express = require('express');
const adminRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:adminRouter');

const book = [
    {
        title :"Harry Potter",
        author:"J.K.Rowling"
    },
    {
        title :"Art of Exploitation",
        author:"Benjamin Frankling"
    },
    {
        title :"Indian Astrology",
        author:"Sayanto Roy"
    },
    {
        title :"Doki Doki",
        author:"Dhruv Kinger"
    }
];

function routere(nav)
{
adminRouter.route('/')
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
            const response = await db.collection('book').insertMany(book);
            res.json(response);
        }
        catch(err){
            debug("Error My Friend!!");
        }

        client.close();
    }());


    });

return adminRouter;
}

module.exports = routere;