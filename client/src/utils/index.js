const TICKET_PRICE = 100;
const COMMISION_PERC = 0.2;

const FIELDS = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'totalSales',
    label: 'Total Sales',
  },
  {
    key: 'totalEarnings',
    label: 'Total Sales Earnings',
  },
  {
    key: 'totalEarningsFriends',
    label: 'Total From Friends',
  },
  {
    key: 'totalOverall',
    label: 'Total From Earnings and Friends',
  },
];

const getTotalEarnedFromFriends = (friends) => {
  let total = 0;
  friends.forEach(
    (child) =>
      (total +=
        child.totalSales * TICKET_PRICE * COMMISION_PERC +
        getTotalEarnedFromFriends(child.children) * COMMISION_PERC)
  );
  return total;
};

const getCsvData = (friends) => {
  let data = [];
  friends.forEach((friend) => {
    const csvObj = {
      name: friend.name,
      totalSales: friend.totalSales,
      totalEarnings: friend.totalSales * TICKET_PRICE,
      totalEarningsFriends: getTotalEarnedFromFriends(friend.children),
      totalOverall:
        getTotalEarnedFromFriends(friend.children) +
        friend.totalSales * TICKET_PRICE,
    };
    data = [...data, csvObj, ...getCsvData(friend.children)];
  });
  return data;
};

export { TICKET_PRICE, FIELDS, getTotalEarnedFromFriends, getCsvData };
