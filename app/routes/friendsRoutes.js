const router = require('express').Router();
const Friend = require('../mongo/schemas/friend');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

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

const getCsvData = (friends) => {
  let data = [];
  friends.forEach((friend) => {
    let totalEarningsFriends = 0;
    friend.children.forEach(
      (child) => (totalEarningsFriends += child.totalSales * 100)
    );
    const csvObj = {
      name: friend.name,
      totalSales: friend.totalSales,
      totalEarnings: friend.totalSales * 100,
      totalEarningsFriends: totalEarningsFriends * 0.2,
      totalOverall: totalEarningsFriends * 0.2 + friend.totalSales * 100,
    };
    data = [...data, csvObj];
  });
  return data;
};

router.get('/', (req, res) => {
  Friend.find({ isChild: false })
    .populate('children')
    .then(
      (friends) => {
        res.status(200).json(friends);
      },
      (err) => res.status(403).json(err)
    );
});

router.post('/savenew', (req, res) => {
  const { friend } = req.body;
  if (friend.attachId) {
    Friend.findOne({ _id: friend.attachId }).then(
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
                Friend.populate(
                  savedFriend,
                  { path: 'children' },
                  (err, fr) => {
                    if (err) {
                      res.status(403).json(err);
                    } else {
                      res.status(200).json(fr);
                    }
                  }
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
    saveNewFriend(friend).then(
      (savedFriend) => {
        res.status(200).json(savedFriend);
      },
      (err) => res.status(403).json(err)
    );
  }
});

router.get('/export', (req, res) => {
  const fields = [
    {
      title: 'Name',
      id: 'name',
    },
    {
      title: 'Total Sales',
      id: 'totalSales',
    },
    {
      title: 'Total Sales Earnings',
      id: 'totalEarnings',
    },
    {
      title: 'Total From Friends',
      id: 'totalEarningsFriends',
    },
    {
      title: 'Total From Earnings and Friends',
      id: 'totalOverall',
    },
  ];

  Friend.find()
    .populate('children')
    .then(
      (friends) => {
        const csvWriter = createCsvWriter({
          path: path.join(__dirname, '../../download/salesData.csv'),
          header: fields,
        });
        csvWriter.writeRecords(getCsvData(friends)).then(
          () => {
            const file = path.join(__dirname, '../../download/salesData.csv');
            console.log('...Done', file);
            res.download(file, 'salesData.csv', (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('downloading');
              }
            });
          },
          (err) => {
            res.status(403).json(err);
          }
        );
      },
      (err) => {
        res.status(403).json(err);
      }
    );
});

module.exports = router;
