const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:GoodService');

const parser = xml2js.Parser({explicitArray:false});


module.exports = function(){
    function getbyID() {
        return new Promise((resolve,reject) => {
            axios.get('https://www.goodreads.com/book/show/3.xml?key=E7E0D9O9Ku7QyQnhOCNpvg')
            .then((response) => {
                parser.parseString(response.data , (err , result) => {
                    if(err)
                    {
                        debug(err);
                    }
                    else
                    {
                        debug(result);
                        resolve(result.GoodreadsResponse.book);
                    }
                });
            })
            .catch((error)=> {
                
                reject(error);
                debug(error);

            })
        })
    }
    return {getbyID};

}();