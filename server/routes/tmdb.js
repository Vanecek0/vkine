const express = require("express");
const needle = require("needle");
const url = require("url");
const tmdbRouter = express.Router();

const api_key_name = "api_key";
const api_key_value = "1352162c392a28763fb9ead036a779cf";
const api_base_url = "https://api.themoviedb.org/3/";

tmdbRouter.get("*", async (req, res) => {
    try {
        const path = req.path;
        const params = new URLSearchParams({
            [api_key_name]: api_key_value,
            ...url.parse(req.url, true, false).query
        });
        const apiRes = await needle('get', `${api_base_url}${path}?${params}`);
        const data = apiRes.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = tmdbRouter;