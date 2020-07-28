import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { CSVLink } from 'react-csv';

import './HeaderActions.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../actions';

const fields = [
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
const TICKET_PRICE = 100;

const getTotalEarnedFromFriends = (friendChildren: object[]): number => {
  let total = 0;
  friendChildren?.forEach(
    (child: any) =>
      (total +=
        child.totalSales * TICKET_PRICE * 0.2 +
        getTotalEarnedFromFriends(child.children) * 0.2)
  );
  return total;
};

const getCsvData = (friends: any): any => {
  let data: any = [];
  friends?.forEach((friend: any) => {
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

const HeaderActions = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state: any) => state.friends);

  const clearAttachId = useCallback(() => dispatch(setFriendToAttach(null)), [
    dispatch,
  ]);

  const openNewFriendDialog = useCallback(() => {
    clearAttachId();
    dispatch(setNewFriendDialog(true));
  }, [dispatch, clearAttachId]);

  return (
    <div className="wrapper">
      <Button
        color="primary"
        className="spacingRight"
        onClick={openNewFriendDialog}
      >
        Add A Root Friend
      </Button>
      <CSVLink data={getCsvData(items)} headers={fields} filename="salesData">
        <Button className="spacingRight" color="info">
          Export Tree
        </Button>
      </CSVLink>
      <h4>Bring A Friend Tree</h4>
    </div>
  );
};

export default HeaderActions;
