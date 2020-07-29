const express = require('express');
const articleRoute = require('../router/article');
const adminRoute = require('../router/admin');
require('../mongodb/mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use('/api/articles', articleRoute);
app.use('/admin', adminRoute);


app.listen(port, () => {
    console.log('Server Running on Port ' + port)
})