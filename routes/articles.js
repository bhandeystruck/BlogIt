const express = require('express');

const Article = require('./../models/article');

//get express router
const router = express.Router();

//now we can use Router functionalities 
router.get('/',(req,res)=>{
    res.send("In articles Router")
})

router.post('/', async(req,res, next) =>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async(req,res)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))



//lets create a new route for new article button to route to
router.get('/new', (req,res) =>{
    //lets make it render the new ejs when requested
    res.render('articles/new', {article: new Article()});
})


router.get('/edit/:id', async (req,res) =>{
    const article =  await Article.findById(req.params.id)
    //lets make it render the new ejs when requested
    res.render('articles/edit', {article: article});
})



router.get('/:slug', async(req,res)=>{
    //access the article
    const article =  await Article.findOne({slug: req.params.slug})
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
        res.redirect(`/articles/${article.slug}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/new', {article:article})
    }
    

})



function saveArticleAndRedirect(path){
    return async (req,res) =>{
        let article = req.article
        article.title= req.body.title
        article.description= req.body.description
        article.markdown= req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }
        catch(e){
            console.log(e)
            res.render(`articles/${path}`, {article:article})
        }
        
    
    }
}







//what happens when delete
router.delete('/:id', async (req,res) =>{
    await Article.findByIdAndDelete(req.params.id)
    //redirect us back to the homepage
    res.redirect('/')
})



module.exports = router