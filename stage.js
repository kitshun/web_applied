const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

// 床
const floor = {
  x: 0,
  y: 320,
  w: 640,
  h: 40,
};

// ステージの描画
function drawStage() {
  ctx.fillStyle = "#203060";

  ctx.fillRect(
    floor.x,
    floor.y,
    floor.w,
    floor.h
  );
}