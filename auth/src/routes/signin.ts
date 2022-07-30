import express from "express";

const router = express.Router();

router.get('/api/users/signin', (req, res) => {
  res.send("Hi from signinr")
})

export {router as signinRouter}