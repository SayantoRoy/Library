let express = require('express');
const authors = express.Router();


authors.route('/')
.get((req, res) => {
    res.send("No Authors here Bro!!");
} );

authors.route('/hide')
.get((req, res) =>{
    res.send("Authors Hide!!");
});

module.exports = authors;
