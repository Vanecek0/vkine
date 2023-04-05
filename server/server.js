const express = require("express");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cache = require("./cache.js");
const tmdbRouter = require('./routes/routes.js');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const limiter = rateLimit({
windowMs: 5601000, // 10 Mins
max: 500
});

app.use(cache('2 minutes'));
app.use(limiter);
app.use(express.json());
app.use(cors());

app.set('port', PORT);

// Routes
app.use('/tmdb/', tmdbRouter);

// Project prod path
app.use(express.static('./dist'));

app.get('/*', function(req, res) {
res.sendFile('index.html', { root: './dist' }, function(err) {
if (err) {
res.status(500).send(err);
}
});
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});