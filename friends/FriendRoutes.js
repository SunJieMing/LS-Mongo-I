const express = require('express');
const Friend = require('./FriendModel.js');

const friendRouter = express.Router();

//=========================
//      friend POST
//=========================

friendRouter.post('/', (req, res) => {
  const friendInfo = req.body;

  const { firstName, lastName, age } = friendInfo;

  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  }

  const friend = new Friend(friendInfo);

  friend
    .save()
    .then(savedFriend => {
      res.status(201).json(savedFriend);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the friend to the database" });
    });
});

//=========================
//      friend GET
//=========================

friendRouter.get('/', (req, res) => {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

module.exports = friendRouter;