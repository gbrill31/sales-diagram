const router = require('express').Router();
const Friend = require('../mongo/schemas/friend');

router.get('/', (req, res) => {
  Friend.find()
    .then((friends) => {
      res.status(200).json(friends);
    })
    .catch((err) => res.status(403).json(err));
});

router.post('/savenew', (req, res) => {
  const { friend } = req.body;
  const firendModel = new Friend(friend);
  firendModel.save((err, newFriend) => {
    if (err) {
      return res.status(403).json(err);
    }
    res.status(200).json(newFriend);
  });
});

module.exports = router;
