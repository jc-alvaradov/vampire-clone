const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const score = loadScore() || "new game";

const player = {
  level: 1,
  weapons: [],
};

const sprites = [
  {
    name: "enemy",
    type: "image",
    isImageLoaded: false,
    animation: {
      state: "idle",
      idle: "./assets/goblin/idle.png",
      left: "./assets/goblin/left.png",
      right: "./assets/goblin/right.png",
      up: "./assets/goblin/up.png",
    },
    x: 0,
    y: 0,
  },
  {
    name: "ball",
    type: "ball",
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: -2,
    color: "blue",
  },
];

function resizeCanvas() {
  // TODO: improve dpr
  const targetRatio = 16 / 9;

  if (window.innerWidth / window.innerHeight > targetRatio) {
    canvas.height = window.innerHeight;
    canvas.width = canvas.height * targetRatio;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width / targetRatio;
  }

  const dpr = window.devicePixelRatio;

  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
}

// function isClickInsideBall(clickX, clickY) {
//   const distance = Math.sqrt(
//     Math.pow(clickX - ball.x, 2) + Math.pow(clickY - ball.y, 2)
//   );
//   return distance <= ball.radius;
// }

// function saveScore() {
//   localStorage.setItem("score", 100);
// }

function loadScore() {
  const score = window.localStorage.getItem("score");

  return score;
}

// function isMouseOverBall(mouseX, mouseY) {
//   // calculate distance using pythagorean theorem
//   const distance = Math.sqrt(
//     Math.pow(mouseX - ball.x, 2) + Math.pow(mouseY - ball.y, 2)
//   );
//   // return true if distance is less than radius
//   return distance <= ball.radius;
// }

function drawBall(sprite) {
  ctx.beginPath();
  ctx.arc(sprite.x, sprite.y, sprite.radius, 0, Math.PI * 2);
  ctx.fillStyle = sprite.color;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  canvas.style.background = "green";

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawUI();
  drawSprites();
}

function drawSprites() {
  // read sprites array of objects with position + sprite
  sprites.forEach((sprite) => {
    if (sprite.type === "image") {
      const image = new Image();
      let imgSrc;

      if (sprite.animation) {
        if (sprite.animation.state === "idle") {
          imgSrc = sprite.animation.idle;
        }
        if (sprite.animation.state === "right") {
          imgSrc = sprite.animation.right;
        }
        if (sprite.animation.state === "left") {
          imgSrc = sprite.animation.left;
        }

        if (sprite.animation.state === "up") {
          imgSrc = sprite.animation.up;
        }
      }

      image.src = imgSrc;

      image.addEventListener("load", () => {
        sprite.isImageLoaded = true;
      });

      if (sprite.isImageLoaded) {
        ctx.drawImage(image, sprite.x, sprite.y);
      }
    }
    if (sprite.type === "ball") {
      drawBall(sprite);
    }
  });
}

function drawUI() {
  ctx.font = "48px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(score, 10, 50);

  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Level: " + player.level, canvas.width - 200, 50);
}

function handleInput() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      sprites.forEach((sprite) => {
        if (sprite.name === "enemy") {
          sprite.x = sprite.x + 1;
          if (sprite.animation.state !== "right") {
            sprite.animation.state = "right";
          }
        }
      });
    }

    if (e.key === "ArrowLeft") {
      sprites.forEach((sprite) => {
        if (sprite.name === "enemy") {
          sprite.x = sprite.x - 1;
          if (sprite.animation.state !== "left") {
            sprite.animation.state = "left";
          }
        }
      });
    }

    if (e.key === "ArrowUp") {
      sprites.forEach((sprite) => {
        if (sprite.name === "enemy") {
          sprite.y = sprite.y - 1;
          if (sprite.animation.state !== "up") {
            sprite.animation.state = "up";
          }
        }
      });
    }

    if (e.key === "ArrowDown") {
      sprites.forEach((sprite) => {
        if (sprite.name === "enemy") {
          sprite.y = sprite.y + 1;
          if (sprite.animation.state !== "idle") {
            sprite.animation.state = "idle";
          }
        }
      });
    }
  });

  // canvas.addEventListener("mousemove", (event) => {
  //   // TODO: improve performance
  //   const mouseX = event.offsetX;
  //   const mouseY = event.offsetY;

  //   if (isMouseOverBall(mouseX, mouseY)) {
  //     document.body.style.cursor = "pointer";
  //   } else {
  //     document.body.style.cursor = "default";
  //   }
  // });

  // canvas.addEventListener("click", (event) => {
  //   const rect = canvas.getBoundingClientRect();
  //   const clickX = event.clientX - rect.left;
  //   const clickY = event.clientY - rect.top;

  //   if (isClickInsideBall(clickX, clickY)) {
  //     ball.color = ball.color === "red" ? "blue" : "red";
  //     saveScore();
  //   }
  // });
}

function update() {
  // update game logic
}

function main() {
  handleInput();
  update();
  draw();
  requestAnimationFrame(main);
}

main();
