let express = require('express');
let path = require('path');
const debug = require('debug')('app');




let app = express();
const port = process.env.PORT || 3000;

const nav = [{link:'/books' , title:'book'},
{link:'/authors' , title:'author'},
{link:'/doker' , title:'Doker'}
] ;

const bookRoute = require('./src/routes/bookrouter')(nav);
const authorRoute = require('./src/routes/authorRoutes');
const adminRouter = require('./src/routes/adminRouter')(nav);



app.use(express.static(path.join(__dirname , 'public')));
app.use('/css' , express.static(path.join(__dirname , 'node_modules/bootstrap/dist/css')));
app.use('/js' , express.static(path.join(__dirname , 'node_modules/bootstrap/dist/js')));
app.use('/js' , express.static(path.join(__dirname , 'node_modules/jquery/dist'))); 
app.set('views' , './src/views');
app.set('view engine' , 'ejs');



app.use('/books', bookRoute);

app.use('/authors' , authorRoute);

app.use('/admin' , adminRouter);

app.get('/' , function(req ,res){
    res.render('index' , 
    {
        nav ,
        title: "Doki Doki "
    }
    );
});

app.listen(port , function(){
    console.log(`We are listening on port ${port}`);
});


app.get('/doki' , function(req ,res){
    res.sendFile(path.join(__dirname , 'view' , 'index.html'));
    
});


