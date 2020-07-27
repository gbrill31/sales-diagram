import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Card, Button, CardHeader, CardBody, CardTitle } from 'reactstrap';

import ConnectingLine from '../ConnectingLine/ConnectingLine';

import './Friend.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../../actions';

interface Friends {
  _id: number | string;
  x: number;
  y: number;
  name: string;
  totalSales: number;
  children: Friends[];
}

const TICKET_PRICE = 100;

const Friend = ({ _id, x, y, name, totalSales, children }: Friends) => {
  const dispatch = useDispatch();

  const [position, setPosition] = useState({ x, y });
  const [centerPosition, setCenterPosition] = useState({ x, y });
  const [isMoveCard, setIsMoveCard] = useState(false);
  const cardRef = useRef<any>();
  const offset = useRef<any>();

  const nestedFriends = children?.map((friend) => {
    return <Friend key={friend._id} {...friend} />;
  });

  const setAttachId = useCallback(() => dispatch(setFriendToAttach(_id)), [
    dispatch,
    _id,
  ]);

  const openNewFriendDialog = useCallback(() => {
    setAttachId();
    dispatch(setNewFriendDialog(true));
  }, [dispatch, setAttachId]);

  const enableMoveCard = (e: any) => {
    offset.current = {
      offsetX: cardRef.current.offsetLeft - e.clientX,
      offsetY: cardRef.current.offsetTop - e.clientY,
    };
    setIsMoveCard(true);
  };
  const disableMoveCard = () => setIsMoveCard(false);

  const setCardPosition = (e: any) => {
    const { offsetX, offsetY } = offset.current;
    const layoutElement: any = document.querySelector('.layoutWrapper');
    const containerBoundries = layoutElement.getBoundingClientRect();
    const cardElementBoundries = cardRef.current.getBoundingClientRect();
    if (containerBoundries) {
      const x = e.clientX + offsetX;
      const y = e.clientY + offsetY;
      setPosition({
        x,
        y,
      });
      setCenterPosition({
        x: x + cardElementBoundries.width / 2,
        y: y + cardElementBoundries.height / 2,
      });
    }
  };

  const getTotalEarnedFromFriends = (friendChildren: object[]): number => {
    let total = 0;
    friendChildren?.forEach(
      (child: any) => (total += child.totalSales * TICKET_PRICE * 0.2)
    );
    return total;
  };

  useEffect(() => {
    if (isMoveCard) {
      window.addEventListener('mousemove', setCardPosition);
    } else {
      window.removeEventListener('mousemove', setCardPosition);
    }
    const cardElement = cardRef.current;
    if (cardElement) {
      const cardElementBoundries = cardElement.getBoundingClientRect();
      setCenterPosition({
        x: cardElement.offsetLeft + cardElementBoundries.width / 2,
        y: cardElement.offsetTop + cardElementBoundries.height / 2,
      });
    }
    return () => {
      window.removeEventListener('mousemove', setCardPosition);
    };
  }, [isMoveCard, cardRef, setCenterPosition]);

  return (
    <>
      {nestedFriends?.length > 0 &&
        nestedFriends.map((nested: any) => {
          return (
            <ConnectingLine
              key={`l-${nested.props._id}`}
              sourceX={centerPosition.x}
              sourceY={centerPosition.y}
              targetId={nested.props._id}
            />
          );
        })}
      <div
        className="friendCard"
        id={`friend${_id}`}
        ref={cardRef}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={enableMoveCard}
        onMouseUp={disableMoveCard}
      >
        <Card>
          <CardHeader className="cardHeader">{name}</CardHeader>
          <CardBody>
            <CardTitle>{`Total sales: ${totalSales}`}</CardTitle>
            <CardTitle>{`Total earned from sales: ${
              totalSales * TICKET_PRICE
            }`}</CardTitle>
            <CardTitle>{`Total earned from friends: ${getTotalEarnedFromFriends(
              children
            )}`}</CardTitle>
            <CardTitle>{`Total earned from sales + friends: ${
              totalSales * TICKET_PRICE + getTotalEarnedFromFriends(children)
            }`}</CardTitle>
            <Button onClick={openNewFriendDialog}>Add new friend</Button>
          </CardBody>
        </Card>
      </div>
      {nestedFriends}
    </>
  );
};

export default Friend;
