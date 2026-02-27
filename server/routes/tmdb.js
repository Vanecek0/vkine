import { Router } from "express";
import needle from "needle";
import { parse } from "url";
const tmdbRouter = Router();

const api_key_name = "api_key";
const api_key_value = process.env.TMDB_API_KEY_VALUE;
const api_base_url = "https://api.themoviedb.org/3";

tmdbRouter.get("*", async (req, res) => {
    try {
        const path = req.path;
        const params = new URLSearchParams({
            [api_key_name]: api_key_value,
            ...parse(req.url, true, false).query
        });
        const apiRes = await needle('get', `${api_base_url}${path}?${params}`);
        const data = apiRes.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default tmdbRouter;
