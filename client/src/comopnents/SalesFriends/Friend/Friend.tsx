import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Card, Button, CardHeader, CardBody, CardText } from 'reactstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConnectingLine from '../ConnectingLine/ConnectingLine';

import './Friend.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../../actions';

interface Friends {
  _id: number | string;
  x: number;
  y: number;
  name: string;
  totalSales: number;
  level: number;
  children: Friends[];
}

const TICKET_PRICE = 100;

const Friend = ({ _id, x, y, name, totalSales, level, children }: Friends) => {
  const dispatch = useDispatch();

  const [position, setPosition] = useState({ x, y });
  const [centerPosition, setCenterPosition] = useState({ x, y });
  const [isMoveCard, setIsMoveCard] = useState(false);
  const cardRef = useRef<any>();
  const offset = useRef<any>();

  const nestedFriends = children?.map((friend) => {
    Object.assign(friend, { level: level + 1 });
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
    const layoutBoundries = layoutElement.getBoundingClientRect();
    const cardElementBoundries = cardRef.current.getBoundingClientRect();
    if (layoutBoundries) {
      const x = e.clientX + offsetX;
      const y = e.clientY + offsetY;

      // const calcPosX = e.clientX - offsetX - cardElementBoundries.width / 2;
      // const calcPosY = e.clientY - offsetY - cardElementBoundries.height / 2;
      // console.log(calcPosX, calcPosY);

      setCenterPosition({
        x: x + cardElementBoundries.width / 2,
        y: y + cardElementBoundries.height / 2,
      });
      setPosition({
        x,
        y,
      });
    }
  };

  const getTotalEarnedFromFriends = (friendChildren: object[]): number => {
    let total = 0;
    friendChildren?.forEach(
      (child: any) =>
        (total +=
          child.totalSales * TICKET_PRICE * 0.2 +
          getTotalEarnedFromFriends(child.children) * 0.2)
    );
    return total;
  };

  const getRandomColor = () => {
    if (level % 2 === 0) return `rgb(${150}, ${0}, ${255 / level})`;
    return `rgb(${255 / level}, ${0}, ${150})`;
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
              color={getRandomColor()}
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
          <CardHeader className="cardHeader">
            {name}
            <Button onClick={openNewFriendDialog}>
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </Button>
          </CardHeader>
          <CardBody>
            <CardText className="cardText">{`Total sales: ${totalSales}`}</CardText>
            <CardText className="cardText">{`Total earned from sales: ${
              totalSales * TICKET_PRICE
            }`}</CardText>
            <CardText className="cardText">{`Total earned from friends: ${getTotalEarnedFromFriends(
              children
            )}`}</CardText>
            <CardText className="cardText">{`Total earned from sales + friends: ${
              totalSales * TICKET_PRICE + getTotalEarnedFromFriends(children)
            }`}</CardText>
          </CardBody>
        </Card>
      </div>
      {nestedFriends}
    </>
  );
};

export default React.memo(Friend);
