const router = require('express').Router();
const Friend = require('../mongo/schemas/friend');

const saveNewFriend = (friend) => {
  return new Promise((resolve, reject) => {
    const firendModel = new Friend(friend);
    firendModel.save((err, savedFriend) => {
      if (err) {
        reject(err);
      }
      resolve(savedFriend);
    });
  });
};

router.get('/', (req, res) => {
  Friend.find({ isChild: false })
    .exec()
    .then(
      (friends) => {
        res.status(200).json(friends);
      },
      (err) => res.status(403).json(err)
    );
});

router.post('/save', (req, res) => {
  const { friend } = req.body;
  if (friend.attachId) {
    Friend.findOne({ _id: friend.attachId })
      .exec()
      .then(
        (dbFriend) => {
          if (dbFriend) {
            delete friend.attachId;
            friend.isChild = true;
            saveNewFriend(friend).then(
              (savedFriend) => {
                dbFriend.children = [...dbFriend.children, savedFriend];
                dbFriend.save((err, savedFriend) => {
                  if (err) {
                    return res.status(403).json(err);
                  }
                  Friend.find({ isChild: false })
                    .exec()
                    .then(
                      (friends) => {
                        res.status(200).json(friends);
                      },
                      (err) => res.status(403).json(err)
                    );
                  // res.status(200).json(savedFriend);
                });
              },
              (err) => res.status(403).json(err)
            );
          }
        },
        (err) => res.status(403).json(err)
      );
  } else {
    saveNewFriend(friend).then(
      (savedFriend) => {
        res.status(200).json(savedFriend);
      },
      (err) => res.status(403).json(err)
    );
  }
});

module.exports = router;
