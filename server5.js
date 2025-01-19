// working with mongo db
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const Blog = require('./models/blog.js');

app.use(express.json());

// connect db
mongoose.connect(process.env.MONGO_URL).then(() => console.log('database conncted'))

// post method
app.post('/api/create-blog', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    if (!title) {
        return res.status(400).json({ message: 'please enter a title' })
    }

    if (!content) {
        return res.status(400).json({ message: 'please enter a content' })
    }

    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(200).json({ message: 'blog added successfully' })
    } catch (err) {
        res.status(400).json({ message: 'an error occured', error: err })
    }

})


// get blogs
app.get('/api/all-blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(400).json({ message: 'an error occured', error: err })
    }
})

// get a single blog
app.get('/api/blog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json({ message: 'an error occured', error: err })
    }
})

// update a blog
app.put('/api/update-blog/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        await Blog.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({ message: 'blog updated successfully' })
    }catch(err){
        res.status(400).json({ message: 'an error occured', error: err })
    }
})

// delete a blog
app.delete('/api/delete-blog/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        await Blog.findByIdAndDelete(id)
        res.status(200).json({message: 'blog deleted successfully'})
    }catch(err){
        res.status(400).json({ message: 'an error occured', error: err })
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))