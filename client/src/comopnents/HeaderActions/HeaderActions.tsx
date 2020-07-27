import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import './HeaderActions.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../actions';
import { exportToCsv } from '../../api';

const HeaderActions = () => {
  const dispatch = useDispatch();

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
      <Button className="spacingRight" color="info" onClick={exportToCsv}>
        Export Tree
      </Button>
      <h4>Bring A Friend Tree</h4>
    </div>
  );
};

export default HeaderActions;
