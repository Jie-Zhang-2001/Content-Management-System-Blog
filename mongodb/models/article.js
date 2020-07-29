const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    introduction: {
        type: String,
        required: true,
        trim:true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim:true,
    }, post: {
        type: Boolean,
        required: true,
    }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;