const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const score = loadScore() || "new game";

const player = {
  level: 1,
  weapons: [],
  movementDistance: 50,
};

let renders = 0;

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

function drawText(text, x, y, opts) {
  ctx.font = opts?.font || "12px Arial";
  ctx.fillStyle = opts?.color || "white";
  ctx.fillText(text, x, y);
}

// function isMouseOverBall(mouseX, mouseY) {
//   // calculate distance using pythagorean theorem
//   const distance = Math.sqrt(
//     Math.pow(mouseX - ball.x, 2) + Math.pow(mouseY - ball.y, 2)
//   );
//   // return true if distance is less than radius
//   return distance <= ball.radius;
// }

function draw() {
  canvas.style.background = "green";

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renders++;

  drawText("RENDERS: " + renders, 10, 150);

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
  });
}

function drawUI() {
  drawText(score, 10, 50, { font: "48px Arial" });

  drawText(`Level: ${player.level}`, canvas.width - 200, 50, {
    font: "48px Arial",
    color: "white",
  });

  drawText(`x pos: ${sprites[0].x}`, 10, 70);
  drawText(`y pos: ${sprites[0].y}`, 10, 90);
  drawText(`canvas width: ${canvas.width}`, 10, 110);
  drawText(`canvas height: ${canvas.height}`, 10, 130);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    sprites.forEach((sprite) => {
      if (sprite.name === "enemy") {
        if (sprite.x < canvas.width - 100) {
          sprite.x = sprite.x + player.movementDistance;
          if (sprite.animation.state !== "right") {
            sprite.animation.state = "right";
          }
        }
      }
    });
  }

  if (e.key === "ArrowLeft") {
    sprites.forEach((sprite) => {
      if (sprite.name === "enemy") {
        if (sprite.x > 0) {
          sprite.x = sprite.x - player.movementDistance;
          if (sprite.animation.state !== "left") {
            sprite.animation.state = "left";
          }
        }
      }
    });
  }

  if (e.key === "ArrowUp") {
    sprites.forEach((sprite) => {
      if (sprite.name === "enemy") {
        if (sprite.y > 0) {
          sprite.y = sprite.y - player.movementDistance;
          if (sprite.animation.state !== "up") {
            sprite.animation.state = "up";
          }
        }
      }
    });
  }

  if (e.key === "ArrowDown") {
    sprites.forEach((sprite) => {
      if (sprite.name === "enemy") {
        if (sprite.y < canvas.height - 100) {
          sprite.y = sprite.y + player.movementDistance;
          if (sprite.animation.state !== "idle") {
            sprite.animation.state = "idle";
          }
        }
      }
    });
  }
});

function update() {
  // update game logic
}

function main() {
  update();
  draw();
  requestAnimationFrame(main);
}

main();
