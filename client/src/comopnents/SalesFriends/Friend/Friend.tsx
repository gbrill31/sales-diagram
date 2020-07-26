import React, { useState, useEffect, useRef } from 'react';

import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

import './Friend.scss';

interface Friends {
  id: number;
  x: number;
  y: number;
  name: string;
  totalSales: number;
  children: Friends[];
}

const Friend = ({ x, y, name, totalSales, children }: Friends) => {
  const [position, setPosition] = useState({ x, y });
  const [isMoveCard, setIsMoveCard] = useState(false);
  const cardRef = useRef<any>();
  const offset = useRef<any>();

  const nestedFriends = children.map((friend) => {
    return <Friend key={friend.id} {...friend} />;
  });

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
    if (containerBoundries) {
      const x = e.clientX + offsetX;
      const y = e.clientY + offsetY;
      setPosition({
        x,
        y,
      });
    }
  };

  useEffect(() => {
    if (isMoveCard) {
      window.addEventListener('mousemove', setCardPosition);
    } else {
      window.removeEventListener('mousemove', setCardPosition);
    }
    return () => {
      window.removeEventListener('mousemove', setCardPosition);
    };
  }, [isMoveCard]);

  return (
    <>
      <div
        className="friendCard"
        ref={cardRef}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={enableMoveCard}
        onMouseUp={disableMoveCard}
      >
        <Card>
          <CardHeader className="cardHeader">{name}</CardHeader>
          <CardBody>
            <CardTitle>{`Total sales: ${totalSales}`}</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Go somewhere</Button>
          </CardBody>
        </Card>
      </div>
      {nestedFriends}
    </>
  );
};

export default Friend;
