const express = require('express');

const Article = require('./../models/article');

//get express router
const router = express.Router();

//now we can use Router functionalities 
router.get('/',(req,res)=>{
    res.send("In articles Router")
})


//lets create a new route for new article button to route to
router.get('/new', (req,res) =>{
    //lets make it render the new ejs when requested
    res.render('articles/new', {article: new Article()});
})


router.get('/:id', async(req,res)=>{
    //access the article
    const article =  await Article.findById(req.params.id)
    //if user dosnt find article send back to home page
    if(article == null)
    {
        res.redirect('/')
    } 

    res.render('articles/show', {article:article})
  
})


router.post('/', async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/new', {article:article})
    }
    

})



module.exports = router