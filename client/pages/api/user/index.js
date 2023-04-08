import { NextApiRequest as req, NextApiResponse as res } from "next";

export default function getAllUsers(req, res) {
    if(req.method !== 'GET') {
        res.status(500).json({message: 'Sorry we only accept GET request.'})
    }
    res.json({hello: 'world', method: req.method});
}