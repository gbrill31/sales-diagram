import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Lines } from '../../../interfaces';

import './ConnectingLine.scss';

const ConnectingLine = ({ sourceX, sourceY, targetId, level }: Lines) => {
  const [targetPos, setTatrgetPos] = useState({ x: 0, y: 0 });
  const lastSourcePos = useRef({ x: sourceX, y: sourceY });

  const calcLine = useCallback((): void => {
    const targetElement: any = document.querySelector(`#friend${targetId}`);
    lastSourcePos.current = {
      x: sourceX,
      y: sourceY,
    };
    if (targetElement) {
      const targetElementBoundries = targetElement.getBoundingClientRect();
      setTatrgetPos({
        x: targetElementBoundries.left + targetElementBoundries.width / 2,
        y: targetElementBoundries.top + targetElementBoundries.height / 8,
      });
    }
  }, [sourceX, sourceY, targetId, setTatrgetPos]);

  const getLevelColor = () => {
    if (level % 2 === 0) return `rgb(${150}, ${0}, ${0})`;
    if (level % 3 === 0) return `rgb(${0}, ${0}, ${150})`;
    if (level % 5 === 0) return `rgb(${50}, ${50}, ${150})`;
    return `rgb(${0}, ${150}, ${0})`;
  };

  useEffect(() => {
    calcLine();
  }, [sourceX, sourceY, calcLine]);

  useEffect(() => {
    const targetElement: any = document.querySelector(`#friend${targetId}`);
    if (targetElement) {
      targetElement.onmousedown = () => {
        targetElement.onmousemove = () => calcLine();
      };
      targetElement.onmouseup = () => {
        targetElement.onmousemove = null;
      };
    }

    return () => {
      targetElement.onmousedown = null;
      targetElement.onmouseup = null;
    };
  }, [targetId, calcLine]);

  return (
    <>
      {targetId && (
        <div id={`line${targetId}`}>
          <svg className="line">
            <line
              x1={sourceX}
              y1={sourceY}
              x2={targetPos.x}
              y2={targetPos.y}
              style={{ stroke: getLevelColor(), strokeWidth: '3' }}
            ></line>
          </svg>
        </div>
      )}
    </>
  );
};

export default React.memo(ConnectingLine);
