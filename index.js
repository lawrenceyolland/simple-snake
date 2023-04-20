(function () {
    const gameBoard = document.getElementById("game-board");
    const scoreValue = document.getElementById("score-value");
    let direction = 37;
    let snakeData = [{ x: 135, y: 90 }];
    let food = { x: 60, y: 45 };
    let score = 0;
  
    const updateCanvas = () => {
      gameBoard.innerHTML = "";
  
      const foodItem = document.createElement("div");
      foodItem.style.left = `${food.x}px`;
      foodItem.style.top = `${food.y}px`;
      foodItem.className = `food`;
      gameBoard.appendChild(foodItem);
  
      snakeData.forEach((unit, idx) => {
        const snakePart = document.createElement("div");
        snakePart.style.left = `${unit.x}px`;
        snakePart.style.top = `${unit.y}px`;
        snakePart.className = `snake ${idx + 1}`;
        gameBoard.appendChild(snakePart);
      });
    };
  
    const updateScore = () => {
      score += 1;
      scoreValue.innerHTML = `${score}`;
    };
  
    const increaseSnakeLength = () => {
      const lastItem = snakeData.length - 1;
      snakeData.push({
        x: snakeData[lastItem].x + 15,
        y: snakeData[lastItem].y,
      });
      updateScore();
      updateFoodPosition();
      updateCanvas();
    };
  
    const updateFoodPosition = () => {
      const randomX = Math.floor((Math.random() * 180) / 15) * 15;
      const randomY = Math.floor((Math.random() * 180) / 15) * 15;
  
      console.log({ randomX, randomY });
      const checkNewLocation =
        snakeData.find(
          (data) => data.x === randomX + 15 && data.y === randomY + 15
        ) || {};
  
      if (Object.keys(checkNewLocation).length !== 0) {
        updateFoodPosition();
      }
  
      food.x = randomX + 15;
      food.y = randomY + 15;
    };
  
    const hasCollidedWithSelf = (x, y) => {
      const obj = snakeData.find((data) => data.x == x && data.y == y) || {};
      return Object.keys(obj).length > 0;
    };
  
    const hasCollidedWithFood = () => {
      return snakeData[0].x === food.x && snakeData[0].y === food.y;
    };
  
    const resetCanvas = () => {
      direction = "";
      snakeData = [{ x: 135, y: 90 }];
      food = { x: 60, y: 45 };
  
      scoreValue.innerHTML = "0";
      return updateCanvas();
    };
  
    const moveSnake = (keyCode) => {
      for (var i = snakeData.length - 1; i > 0; i--) {
        snakeData[i].x = snakeData[i - 1].x;
        snakeData[i].y = snakeData[i - 1].y;
      }
  
      switch (keyCode) {
        case 37:
          if (
            hasCollidedWithSelf(snakeData[0].x - 15, snakeData[0].y) ||
            snakeData[0].x <= 0
          ) {
            return resetCanvas();
          }
  
          snakeData[0].x -= 15;
  
          if (hasCollidedWithFood()) {
            console.log("NOM!");
            return increaseSnakeLength();
          }
          updateCanvas();
          return;
  
        case 38:
          if (
            hasCollidedWithSelf(snakeData[0].x, snakeData[0].y - 15) ||
            snakeData[0].y <= 0
          ) {
            return resetCanvas();
          }
  
          snakeData[0].y -= 15;
  
          if (hasCollidedWithFood()) {
            console.log("NOM!");
            return increaseSnakeLength();
          }
          updateCanvas();
          return;
  
        case 39:
          if (
            hasCollidedWithSelf(snakeData[0].x + 15, snakeData[0].y) ||
            snakeData[0].x >= 280
          ) {
            return resetCanvas();
          }
  
          snakeData[0].x += 15;
  
          if (hasCollidedWithFood()) {
            console.log("NOM!");
            return increaseSnakeLength();
          }
          updateCanvas();
          return;
  
        case 40:
          if (
            hasCollidedWithSelf(snakeData[0].x, snakeData[0].y + 15) ||
            snakeData[0].y >= 180
          ) {
            return resetCanvas();
          }
  
          snakeData[0].y += 15;
  
          if (hasCollidedWithFood()) {
            console.log("NOM!");
            return increaseSnakeLength();
          }
          updateCanvas();
          return;
  
        default:
          break;
      }
    };
  
    window.onkeydown = ({ keyCode }) => {
      direction = Math.abs(keyCode - direction) === 2 ? direction : keyCode;
    };
  
    setInterval(() => {
      moveSnake(direction);
    }, 200);
  })(document);