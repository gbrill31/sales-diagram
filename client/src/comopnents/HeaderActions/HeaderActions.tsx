import React from 'react';
import { Button } from 'reactstrap';

import './HeaderActions.scss';

const HeaderActions = () => {
  return (
    <div className="wrapper">
      <Button color="primary" className="spacingRight">
        Add A Friend
      </Button>
      <Button color="info">Export information</Button>
    </div>
  );
};

export default HeaderActions;
