import React from 'react';

import HeaderActions from './comopnents/HeaderActions/HeaderActions';
import SalesFriendsLayout from './comopnents/SalesFriends/SalesFriendsLayout';
import PlaceFriendArea from './comopnents/PlaceFriendArea/PlaceFriendArea';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <header>
        <HeaderActions />
      </header>
      <main>
        <SalesFriendsLayout />
      </main>
      <PlaceFriendArea />
    </div>
  );
};

export default App;
