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
  targetId: number;
  level: number;
}

export interface FriendsState {
  items: null | Friends[];
  friendAttachId: null | string;
  getAllPending: boolean;
  getAllError: null | object;
  isNewFriendDialog: boolean;
  setNewFriendPending: boolean;
  setNewFriendError: null | object;
}

export interface ActionTypes {
  type: string;
  payload?: object | string | number | boolean | null;
}
