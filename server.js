const express = require("express");

const AccountsRouter = require("./acccounts/accounts-router.js");

const server = express();

server.use(express.json());

server.use("/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.send("<h2>Conntected to Api</h2>");
});

module.exports = server;
