import { NextApiRequest as req, NextApiResponse as res } from "next";

export default function getUserByID(req, res) {
    res.json({id: req.query.uID, message: ''})
}