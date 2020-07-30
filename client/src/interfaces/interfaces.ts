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
