let express = require('express');
const authors = express.Router();


authors.route('/')
.get((req, res) => {
    res.send("Shut Up you Bitch!! Author");
} );

authors.route('/Bitch')
.get((req, res) =>{
    res.send("Fuck Off Bitch!!");
});

module.exports = authors;
