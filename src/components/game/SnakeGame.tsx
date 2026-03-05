import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Trophy } from 'lucide-react';
import clsx from 'clsx';

// 游戏配置
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const SnakeGame: React.FC = () => {
  // 状态定义
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // 引用以避免闭包陷阱
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // 更新方向引用
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // 生成随机食物
  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // 检查食物是否在蛇身上
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // 游戏循环
  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      // 检查碰撞
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        setIsPlaying(false);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // 检查吃食物
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, isGameOver, score, highScore]);

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, moveSnake]);

  // 开始游戏
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-orange-50 rounded-3xl border border-orange-100 shadow-sm max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center">
        🐍 贪吃蛇小游戏
      </h2>
      <p className="text-stone-500 mb-6 text-center">
        在这放松一下吧！用键盘方向键控制移动。
      </p>

      <div className="flex justify-between w-full max-w-md mb-4 px-4">
        <div className="flex items-center text-orange-600 font-bold">
          <span className="mr-2">得分:</span>
          <span className="text-xl">{score}</span>
        </div>
        <div className="flex items-center text-stone-500 font-medium">
          <Trophy size={18} className="mr-2 text-yellow-500" />
          <span>最高分: {highScore}</span>
        </div>
      </div>

      <div
        className="relative bg-stone-800 rounded-lg shadow-inner overflow-hidden border-4 border-stone-300"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* 食物 */}
        <motion.div
          className="absolute bg-red-500 rounded-full shadow-sm"
          style={{
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
          }}
          layoutId="food"
        />

        {/* 蛇 */}
        {snake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className={clsx(
              "absolute rounded-sm transition-all duration-75",
              index === 0 ? "bg-green-400 z-10" : "bg-green-500"
            )}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              borderRadius: index === 0 ? '4px' : '2px'
            }}
          />
        ))}

        {/* 游戏结束遮罩 */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white z-20">
            <h3 className="text-2xl font-bold mb-2">游戏结束!</h3>
            <p className="mb-4">得分: {score}</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-full font-bold transition-colors flex items-center"
            >
              <RotateCcw size={18} className="mr-2" /> 再来一次
            </button>
          </div>
        )}

        {/* 开始遮罩 */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center"
            >
              <Play size={24} className="mr-2" /> 开始游戏
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-stone-400">
        提示: 按下方向键即可控制方向
      </div>
    </div>
  );
};

export default SnakeGame;
