let express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookControlers');
const goodService = require('../services/goodreadsService');

function routere(nav)
{

    const { getIndex , getID , middleware} = bookController(goodService , nav);
    
bookRouter.use(middleware);
bookRouter.route('/')
.get( getIndex );


bookRouter.route('/:id')
.get(getID);

return bookRouter;
}

module.exports = routere;