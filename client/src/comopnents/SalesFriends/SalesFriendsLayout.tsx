import React from 'react';

import Friend from './Friend/Friend';

import './SalesFriendsLayout.scss';

interface Layout {
  data: any;
}

const SalesFriendsLayout = ({ data }: Layout) => {
  return (
    <div className="layoutWrapper">
      {data.map((item: any) => (
        <Friend key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SalesFriendsLayout;
