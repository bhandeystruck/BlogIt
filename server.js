const express = require ('express');
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override')



//connect to database
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
//express variable
const app = express();
//set up view engine to ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


//lets create a route using app, which takes in a request and a response
app.get('/', async (req,res)=>{
    //creating an article variable to store the data for each article
    const article = await Article.find().sort({createdAt: 'desc'})
    
    //to render the index.ejs
    //we can pass any object any keys
    res.render('articles/index', { article: article })
});



//tell the app to use the article router
app.use('/articles', articleRouter)


app.listen(5000)