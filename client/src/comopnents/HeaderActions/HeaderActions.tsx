import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import './HeaderActions.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../actions';

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
        Add A Friend
      </Button>
      <Button className="spacingRight" color="info">
        Export information
      </Button>
      <h4>Bring A Friend Tree</h4>
    </div>
  );
};

export default HeaderActions;
