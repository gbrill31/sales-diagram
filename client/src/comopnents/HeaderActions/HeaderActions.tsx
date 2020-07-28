import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { CSVLink } from 'react-csv';

import './HeaderActions.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../actions';
import { getCsvData, FIELDS } from '../../utils';

const HeaderActions = () => {
  const dispatch = useDispatch();

  const { items, getAllPending, getAllError } = useSelector(
    (state: any) => state.friends
  );

  const clearAttachId = useCallback(() => dispatch(setFriendToAttach(null)), [
    dispatch,
  ]);

  const openNewFriendDialog = useCallback(() => {
    clearAttachId();
    dispatch(setNewFriendDialog(true));
  }, [dispatch, clearAttachId]);

  return !getAllPending && !getAllError && items ? (
    <div className="wrapper">
      <Button
        color="primary"
        className="spacingRight"
        onClick={openNewFriendDialog}
      >
        Add A Root Friend
      </Button>
      <CSVLink
        data={getCsvData(items) || []}
        headers={FIELDS}
        filename="salesData"
      >
        <Button className="spacingRight" color="info">
          Export Diagram Data
        </Button>
      </CSVLink>
      <h4>Bring A Friend Tree</h4>
    </div>
  ) : null;
};

export default HeaderActions;
