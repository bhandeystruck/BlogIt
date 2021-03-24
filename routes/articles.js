const express = require('express');

//get express router
const router = express.Router();

//now we can use Router functionalities 
router.get('/',(req,res)=>{
    res.send("In articles Router")
})


//lets create a new route for new article button to route to
router.get('/new', (req,res) =>{
    //lets make it render the new ejs when requested
    res.render('articles/new');
})


router.post('/',(req,res)=>{

})



module.exports = router