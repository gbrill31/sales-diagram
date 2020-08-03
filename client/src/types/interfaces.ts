import { Fragment } from 'react';

export interface Friends {
  _id: number | string;
  x: number;
  y: number;
  name: string;
  totalSales: number;
  level: number;
  children: Friends[];
}

export interface Lines {
  sourceX: number;
  sourceY: number;
  targetId: number | string;
  level: number;
}

export interface FriendsState {
  items: null | Friends[];
  friendAttachId: null | string | number;
  getAllPending: boolean;
  getAllError: null | object | string;
  isNewFriendDialog: boolean;
  setNewFriendPending: boolean;
  setNewFriendError: null | object | string;
}
