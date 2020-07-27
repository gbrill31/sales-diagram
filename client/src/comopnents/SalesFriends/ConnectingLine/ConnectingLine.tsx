import React, { useState, useEffect, useCallback, useRef } from 'react';

import './ConnectingLine.scss';

interface Lines {
  sourceX: number;
  sourceY: number;
  targetId: number;
}

export default function ConnectingLine({ sourceX, sourceY, targetId }: Lines) {
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
        y: targetElementBoundries.top + targetElementBoundries.height / 2,
      });
    }
  }, [sourceX, sourceY, targetId, setTatrgetPos]);

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
      <div id={`line${targetId}`}>
        <svg className="line">
          <line
            x1={sourceX}
            y1={sourceY}
            x2={targetPos.x}
            y2={targetPos.y}
            style={{ stroke: 'white', strokeWidth: '3' }}
          ></line>
        </svg>
      </div>
    </>
  );
}
