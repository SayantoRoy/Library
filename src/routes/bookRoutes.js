let express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes')


function routere(nav)
{
bookRouter.route('/')
.get((req ,res) => {
    (async function query(){
        const request  = new sql.Request();
        const result = await request.query('select * from BOOKS')

            debug(result);
            res.render('bookListView' , {
                nav,
                title:'Doki Doki',
                book: result.recordset
            });
    }());
    

    });


bookRouter.route('/:id')
.get((req , res) => {
    const {id} = req.params;
    (async function query(){
        const request = new sql.Request();
        const {recordset} = await request.input('id',sql.Int,id)
        .query('select * from BOOKS where id = @id');
        res.render('bookSingle' , {
            nav,
            title:'Doki Doki',
            book : recordset[0]
    });
    }());
    
});

return bookRouter;
}

module.exports = routere;