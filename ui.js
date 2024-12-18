const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export function drawText(text, x, y, opts) {
  ctx.font = opts?.font || "12px Arial";
  ctx.fillStyle = opts?.color || "white";
  ctx.fillText(text, x, y);
}

export function drawUI(score, player, sprites) {
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
