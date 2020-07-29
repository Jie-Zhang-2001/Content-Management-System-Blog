const jwt = require('jsonwebtoken');
const User = require('../../mongodb/models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, token: token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(404).send({ error: 'Please Authenticate!' });
    }
}

module.exports = auth;