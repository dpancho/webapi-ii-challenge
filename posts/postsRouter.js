const router = require('express').Router();
const db = require('../data/db');

/////////////////
//GET all posts//
/////////////////
router.get('/', (req, res) => {
    const query = req.query;

    db.find(query)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        console.log("Error in GET all posts", err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

/////////////
//GET by ID//
/////////////
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post)
        }else{
           res.status(404).json({ message: "The post with the specified ID does not exist"}) 
        }
    })
    .catch(err => {
        console.log("Error in GET by ID", err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

/////////////////////
//GET comment by ID//
/////////////////////
router.get('/:id', (req, res) => {
    db.findPostComments(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post)
        }else{
           res.status(404).json({ message: "The post with the specified ID does not exist"}) 
        }
    })
    .catch(err => {
        console.log("Error in GET comment by ID", err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

/////////////////
//POST new post//
/////////////////
router.post('/', (req, res) => {
    db.insert(req.body)
    .then(post => {
        if(post){
            res.status(201).json(post)
        }else{
            res.status(404).json({ errorMessage: "Please provide title and contents for the post" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

/////////////////////
//POST new comment //
/////////////////////
router.post('/:id/comments', (req,res) => {
    const id = req.params.id
    const newCommment = { ...req.body, post_id:id };

    db.findById(id)
    .then(post => {
        if(post){
            db.insertComment(newCommment)
            then(comment => res.status(201).json(comment))
            .catch(err => res.status(400).json({ errorMessage: "Please provide text for the comment." }))
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was and error while saving the comment to the database" })
    })
})
//////////
//Delete//
//////////
router.delete('./:id', (req,res) => {
    db.remove(req.params.id)
    .then(post => {
        if(post){
            res.status(201).json(post)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
})

//////////
//UPDATE//
//////////
router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then(post => {
         if(post){
              res.status(201).json(post)
         } else{
              res.status(404).json({ message: "The post with the specified ID does not exist." })
         }
    })
    .catch(error => {
         res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
})


module.exports = router;