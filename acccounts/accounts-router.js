const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Unable to fetch accounts from database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id: id })
    .then(account => {
      if (id) {
        return res.status(200).json(account[0]);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Unable to fetch account from database" });
    });
});

router.post("/", (req, res) => {
  const newAccount = req.body;
  console.log(newAccount);
  if (!newAccount.name) {
    res.status(404).json({ message: "Please add an account name" });
  }
  if (!newAccount.budget) {
    res.status(404).json({ message: "Please add an account budget" });
  }
  db("accounts")
    .insert(newAccount, "id")
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to add account to database" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  console.log(changes);
  const { id } = req.params;
  console.log(id);
  if (!changes.name) {
    res.status(404).json({ message: "Please add an account name" });
  }
  if (!changes.budget) {
    res.status(404).json({ message: "Please add an account budget" });
  }
  db("accounts")
    .where("id", "=", id)
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(400).json({ message: "not found - changes not applied" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding changes to database" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where("id", "=", id)
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} account has been deleted` });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing from database" });
    });
});
module.exports = router;
