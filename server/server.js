const express = require("express");
const next = require('next');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cache = require("./cache.js");
const tmdbRouter = require('./routes/tmdb.js');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: "./client", dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
        const limiter = rateLimit({
            windowMs: 5601000, // 10 Mins
            max: 500
        });
        server.use(cache('2 minutes'));
        server.use(limiter);
        server.use(express.json());
        server.use(cors());

        server.set('port', PORT);

        // Routes
        server.use('/tmdb', tmdbRouter);

        server.get("*", (req, res) => {
            return handle(req, res);
        })

        // Project prod path
        /*app.use(express.static('./dist'));
        
        app.get('/*', function(req, res) {
        res.sendFile('index.html', { root: './dist' }, function(err) {
        if (err) {
        res.status(500).send(err);
        }
        });
        });*/

        server.listen(PORT, err => {
            if(err) throw err;
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(ex => {
        console.log(ex)
    })