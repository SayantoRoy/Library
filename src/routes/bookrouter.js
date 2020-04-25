let express = require('express');
const bookRouter = express.Router();

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
bookRouter.route('/')
.get((req ,res) => {

    res.render('bookListView' , {
        nav,
        title:'Doki Doki',
        book
        });
    });


bookRouter.route('/:id')
.get((req , res) => {
    const {id} = req.params;
        res.render('bookSingle' , {
            nav,
            title:'Doki Doki',
            book : book[id]
    });
    
});

return bookRouter;
}

module.exports = routere;