import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Friend from './Friend/Friend';

import './SalesFriendsLayout.scss';

import { getAllFriends } from '../../actions';

const SalesFriendsLayout = () => {
  const dispatch = useDispatch();
  const { items: friends } = useSelector((state: any) => state.friends);

  const requestAllFriends = useCallback(() => dispatch(getAllFriends()), [
    dispatch,
  ]);

  useEffect(() => {
    if (!friends) {
      requestAllFriends();
    }
  }, [friends, requestAllFriends]);

  return (
    <div className="layoutWrapper">
      {friends &&
        friends.map((item: any) => <Friend key={item._id} {...item} />)}
    </div>
  );
};

export default SalesFriendsLayout;
