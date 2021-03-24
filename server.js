const express = require ('express');

const app = express();

//set up view engine to ejs
app.set('view engine', 'ejs')


//lets create a route using app, which takes in a request and a response
app.get('/', (req,res)=>{
    res.send("Hello");
})











app.listen(5000)