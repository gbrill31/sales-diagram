import React from 'react';

import HeaderActions from './comopnents/HeaderActions/HeaderActions';
import SalesFriendsLayout from './comopnents/SalesFriends/SalesFriendsLayout';
import PlaceFriendArea from './comopnents/PlaceFriendArea/PlaceFriendArea';

import './App.scss';

const salesData = [
  {
    id: 1,
    x: 25,
    y: 35,
    name: 'Guy',
    totalSales: 250,
    children: [],
  },
  {
    id: 2,
    x: 55,
    y: 75,
    name: 'Chicko',
    totalSales: 2000,
    children: [
      {
        id: 11,
        x: 55,
        y: 105,
        name: 'You',
        totalSales: 200,
        children: [
          {
            id: 12,
            x: 55,
            y: 155,
            name: 'Chicko2',
            totalSales: 200,
            children: [
              {
                id: 22,
                x: 155,
                y: 255,
                name: 'Mister',
                totalSales: 200,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

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
