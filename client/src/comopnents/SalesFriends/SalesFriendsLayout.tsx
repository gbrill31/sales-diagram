import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Button } from 'reactstrap';

import Friend from './Friend/Friend';

import './SalesFriendsLayout.scss';

import { getAllFriends } from '../../actions';

const SalesFriendsLayout = () => {
  const dispatch = useDispatch();

  const { items: friends, getAllPending, getAllError } = useSelector(
    (state: any) => state.friends
  );

  const requestAllFriends = useCallback(() => dispatch(getAllFriends()), [
    dispatch,
  ]);

  useEffect(() => {
    if (!friends) {
      requestAllFriends();
    }
  }, [friends, requestAllFriends]);

  return (
    <>
      {getAllPending ? (
        <div className="centerContainer">
          <Spinner
            type="grow"
            style={{ width: '5rem', height: '5rem' }}
            color="success"
          />
          <h2 className="header">Loading Diagram</h2>
        </div>
      ) : getAllError ? (
        <div className="centerContainer">
          <div className="loadError">
            <h2>Something went wrong, cannot load diagram</h2>
            <Button
              color="success"
              outline
              size="lg"
              onClick={requestAllFriends}
            >
              Load Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="layoutWrapper">
          {friends &&
            friends.map((item: any) => (
              <Friend key={item._id} level={1} {...item} />
            ))}
        </div>
      )}
    </>
  );
};

export default SalesFriendsLayout;
