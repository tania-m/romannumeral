const routes = require('express').Router();

routes.get('/health', (req, res) => {
    res.status(200).json({ message: 'Healthy' });
});

module.exports = routes;