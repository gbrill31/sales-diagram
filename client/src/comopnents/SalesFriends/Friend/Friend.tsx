import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';

import { Card, Button, CardHeader, CardBody, CardText } from 'reactstrap';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConnectingLine from '../ConnectingLine/ConnectingLine';

import './Friend.scss';

import { setNewFriendDialog, setFriendToAttach } from '../../../actions';
import { updateFriendPos } from '../../../api';

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

  const [centerPosition, setCenterPosition] = useState({ x, y });

  const cardRef = useRef<any>();

  const nestedFriends = children?.map((friend) => {
    Object.assign(friend, { level: level + 1 });
    return <Friend key={friend._id} {...friend} />;
  });

  const setAttachFriendId = useCallback(
    () => dispatch(setFriendToAttach(_id)),
    [dispatch, _id]
  );

  const openNewFriendDialog = useCallback(() => {
    setAttachFriendId();
    dispatch(setNewFriendDialog(true));
  }, [dispatch, setAttachFriendId]);

  const setCardPosition = (e: any, data: any) => {
    const cardElementBoundries = cardRef.current.getBoundingClientRect();
    setCenterPosition({
      x: data.x + cardElementBoundries.width / 2,
      y: data.y + cardElementBoundries.height / 2,
    });
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

  const getLevelColor = () => {
    if (level % 2 === 0) return `rgb(${150}, ${0}, ${255})`;
    if (level % 3 === 0) return `rgb(${55}, ${0}, ${150})`;
    return `rgb(${155}, ${0}, ${50})`;
  };

  const saveNewPosition = (e: any, data: any) => {
    const newPosObj = {
      x: data.x,
      y: data.y,
      id: _id,
    };
    updateFriendPos(newPosObj);
  };

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      const cardElementBoundries = cardElement.getBoundingClientRect();
      setCenterPosition({
        x: x + cardElementBoundries.width / 2,
        y: y + cardElementBoundries.height / 2,
      });
    }
  }, [cardRef, x, y]);

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
              color={getLevelColor()}
            />
          );
        })}
      <Draggable
        nodeRef={cardRef}
        defaultPosition={{ x: x, y: y }}
        bounds="parent"
        scale={1}
        onDrag={setCardPosition}
        onStop={saveNewPosition}
      >
        <div className="friendCard" id={`friend${_id}`} ref={cardRef}>
          <Card>
            <CardHeader className="cardHeader">
              {name}
              <Button onClick={openNewFriendDialog}>
                <FontAwesomeIcon icon={faUserPlus} size="sm" />
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
      </Draggable>
      {nestedFriends}
    </>
  );
};

export default React.memo(Friend);
