const router = require('express').Router();
const Friend = require('../mongo/schemas/friend');

const saveFriend = async (friend) => {
  return new Promise((resolve, reject) => {
    Friend.findOne({ _id: friend._id })
      .exec()
      .then((dbFriend) => {
        if (dbFriend) {
          Object.assign(dbFriend, friend);
          dbFriend.save((err, saved) => {
            if (err) {
              reject(err);
            }
            resolve(saved);
          });
        } else {
          const firendModel = new Friend(friend);
          firendModel.save((err, savedFriend) => {
            if (err) {
              reject(err);
            }
            resolve(savedFriend);
          });
        }
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
            saveFriend(friend).then(
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
                });
              },
              (err) => res.status(403).json(err)
            );
          }
        },
        (err) => res.status(403).json(err)
      );
  } else {
    saveFriend(friend).then(
      (savedFriend) => {
        res.status(200).json(savedFriend);
      },
      (err) => res.status(403).json(err)
    );
  }
});

router.post('/updatepos', (req, res) => {
  const { friend } = req.body;
  Friend.findByIdAndUpdate({ _id: friend.id }, { x: friend.x, y: friend.y })
    .exec()
    .then(
      (saved) => {
        if (saved) {
          res.status(200).json(saved);
        } else {
          res.status(403).json({});
        }
      },
      (err) => res.status(403).json(err)
    );
});

module.exports = router;
