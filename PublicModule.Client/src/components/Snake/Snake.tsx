import React from "react";
import { useSnake } from "./SnakeHooks";
import styles from "./Snake.module.scss";
export const Snake = () => {
  const { snake } = useSnake();

  return (
    <div className={styles.gameContainer}>
      {/* <div className="score">
        <h3>
          Current score: <span id="currentScore">0</span>
        </h3>
        <h3>
          Highest score: <span id="highestScore">0</span>
        </h3>
      </div> */}
      <div className={styles.borderGame}>
        <div className={styles.gameBoard}>
          {snake.map((part, index) => (
            <div
              key={index}
              className={styles.snake}
              style={{
                gridColumn: part.x,
                gridRow: part.y,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
