import React, { useEffect, useState } from "react";

const GAMESPEED = 100;
let gridSize = 20;

interface PartOfSnake {
  x: number;
  y: number;
}

export const useSnake = () => {
  const [snake, setSnake] = useState<PartOfSnake[]>([
    { x: gridSize / 2, y: gridSize / 2 },
  ]);

  const gameBoard = document.querySelector(".gameBoard");

  const creatElement = (className: string) => {
    const el = document.createElement("div");
    el.classList.add(className);
    return el;
  };

  const drawSnake = () => {
    snake.forEach((segment: any) => {
      const element = creatElement("snake");
      gameBoard?.appendChild(element);
    });
  };

  const loop = () => {
    const gameInterval = setInterval(() => {
      update();
      draw();
    }, GAMESPEED);
  };

  const update = () => {
    console.log("update");
  };

  const draw = () => {
    console.log("draw");
    drawSnake();
  };

  useEffect(() => {
    draw();
  }, []);

  return { snake };
};
