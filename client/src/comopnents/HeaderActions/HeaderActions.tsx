import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import './HeaderActions.scss';

import { setNewFriendDialog } from '../../actions';

const HeaderActions = () => {
  const dispatch = useDispatch();

  const openNewFriendDialog = useCallback(
    () => dispatch(setNewFriendDialog(true)),
    [dispatch]
  );
  return (
    <div className="wrapper">
      <Button
        color="primary"
        className="spacingRight"
        onClick={openNewFriendDialog}
      >
        Add A Friend
      </Button>
      <Button color="info">Export information</Button>
    </div>
  );
};

export default HeaderActions;
