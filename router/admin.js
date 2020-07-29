const express = require('express');
const User = require('../mongodb/models/user');
const Article = require('../mongodb/models/article');
const jwt = require('jsonwebtoken');
const auth = require('../app/middleware/auth');

const adminRoute = express.Router();

adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));

//login and send jwt
adminRoute.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        res.send({error: 'Failed!'});
    } else {
        if (user.password === req.body.password) {
            const token = jwt.sign({ _id: user._id.toString() }, 'Blog');
            user.token = token;
            res.send(token);
        } else {
            res.send({error:'Failed!'})
        }
    }
})
//Adding article
adminRoute.post('/add', async (req, res) => {
    const article = new Article(req.body);
    try {
        await article.save();
        res.status(201).send();
    } catch (e) {
        res.send(e);
    }
})

//Reading all article
adminRoute.get('/all', async (req, res) => {
    const articleList = await Article.find({});
    res.send(articleList);
})

//Delete an article by id
adminRoute.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const article = await Article.findOneAndDelete({ _id: id });
        if (!article) {
            res.status(404).send()
        } else {
            res.send(article);
        }
    } catch (e) {
        res.send(e);
    }
})

//Reading by Id
adminRoute.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const article = await Article.findOne({ _id: id });
        res.send(article);
    } catch (e) {
        res.status(500).send();
    }
})

//updatePostOrSave
adminRoute.patch('/all', async (req, res) => {
    const article = await Article.findOne({ _id: req.body.id })
    try {
        article.post = !article.post;
        article.save();
        res.send(article);
    } catch (e) {
        res.status(500).send();
    }
})

//updateArticle
adminRoute.patch('/edit', async (req, res) => {
    const article = await Article.findOne({ _id: req.body.id });
    try {
        const updateInfo = req.body.info;
        article.title = updateInfo.title;
        article.content = updateInfo.content;
        article.category = updateInfo.category;
        article.date = updateInfo.date;
        article.post = updateInfo.post;
        article.introduction = updateInfo.introduction;
        article.save();
        res.send(article)
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
})

module.exports = adminRoute;