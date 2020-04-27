let express = require('express');
let path = require('path');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');



let app = express();

const port = process.env.PORT || 3000;

const nav = [{link:'/books' , title:'book'},
{link:'/authors' , title:'author'},
{link:'/doker' , title:'Doker'}
] ;

const bookRoute = require('./src/routes/bookrouter')(nav);
const authorRoute = require('./src/routes/authorRoutes');
const adminRouter = require('./src/routes/adminRouter')(nav);
const authRouter = require('./src/routes/authRouter')(nav);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname , 'public')));
app.use('/css' , express.static(path.join(__dirname , 'node_modules/bootstrap/dist/css')));
app.use('/js' , express.static(path.join(__dirname , 'node_modules/bootstrap/dist/js')));
app.use('/js' , express.static(path.join(__dirname , 'node_modules/jquery/dist'))); 
app.set('views' , './src/views');
app.set('view engine' , 'ejs');
app.use(cookieParser());
app.use(session({secret : 'Library' , resave: true, saveUninitialized: true}));
require('./src/config/passport.js')(app);


app.use('/books', bookRoute);

app.use('/authors' , authorRoute);

app.use('/admin' , adminRouter);

app.use('/auth', authRouter);




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



