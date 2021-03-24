const express = require('express');

//get express router
const router = express.Router();

//now we can use Router functionalities 

router.get('/',(req,res)=>{
    res.send("In articles Router")
})


module.exports = router