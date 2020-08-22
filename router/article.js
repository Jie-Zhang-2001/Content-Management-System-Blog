const express = require("express");
const Article = require("../mongodb/models/article");

const articleRoute = express.Router();

articleRoute.use(express.json());
articleRoute.use(express.urlencoded({ extended: true }));

//get all posted articles
articleRoute.get("/page/:page", async (req, res) => {
    const page = req.params.page;
    const articlesList = await Article.find({ post: true }).sort({ date: -1 }).limit(5).skip((page-1) * 5);
    res.send(articlesList);
})

//get top 2 articles for displaying in personal site
articleRoute.get("/topArticles", async (req, res) => {
    const topArticles = await Article.find({ post: true }.sort({ date: -1 }).limit(2));
    res.send(topArticles);
})

//get total document count
articleRoute.get('/count', async (req, res) => {
    const count = await Article.countDocuments();
    res.send(''+ count);
})

//detail article by id
articleRoute.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const article = await Article.findById(id);
        if (!article) {
            res.status(404).send();
        }
        res.send(article);
    } catch (e) {
        res.status(500).send();
    }
})

//get articles based on category
articleRoute.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const categoryList = await Article.find({ category, post:true }).sort({date:-1});
        if (!categoryList) {
            res.status(404).send();
        }
        res.send(categoryList);
    } catch (e) {
        res.status(500).send();
    }
})


module.exports = articleRoute;
