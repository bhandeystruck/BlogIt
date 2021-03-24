const express = require ('express');
const articleRouter = require('./routes/articles')

//express variable
const app = express();

//set up view engine to ejs
app.set('view engine', 'ejs')


//tell the app to use the article router
app.use('/articles', articleRouter)






//lets create a route using app, which takes in a request and a response
app.get('/', (req,res)=>{
    //creating an article variable to store the data for each article
    const articles = [{
        title:'Test Article',
        createdAt: new Date(),
        description: 'Test Description'
    }]

    //to render the index.ejs
    //we can pass any object any keys
    res.render('index', { articles: articles })
})











app.listen(5000)