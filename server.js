const express = require ('express');
const articleRouter = require('./routes/articles')

const app = express();

//set up view engine to ejs
app.set('view engine', 'ejs')


//tell the app to use the article router
app.use('/articles',articleRouter)






//lets create a route using app, which takes in a request and a response
app.get('/', (req,res)=>{
    //to render the index.ejs
    res.render('index')
})











app.listen(5000)