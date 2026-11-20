const GRAVITY = 2000;
const JUMP_SPEED = 700;
const MOVE_SPEED = 240;
const MAX_JUMPS = 2;
const FALL_GRAVITY_RATE = 2;

const FRAME_SIZE = 32;
const FRAME_TIME = 0.12;

// 状態ごとの画像の段（row）とコマ数（count）
const ANIMS = {
  idle: { row: 0, count: 2 },
  run:  { row: 1, count: 4 },
  jump: { row: 2, count: 2 },
  fall: { row: 3, count: 2 },
};

// キー入力
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

// プレイヤー
const player = {
  x: 80,
  y: 20,
  w: 32,
  h: 32,
  vx: 0,
  vy: 0,
  isGrounded: false,
  jumpsLeft: MAX_JUMPS,
  state: "idle",
  frameIndex: 0,
  frameTimer: 0,
  facing: 1,
};

// 床との衝突判定
function collideWithFloor() {
  if (
    player.y + player.h >= floor.y &&
    player.vy >= 0
  ) {
    player.y = floor.y - player.h;
    player.vy = 0;
    player.isGrounded = true;
    player.jumpsLeft = MAX_JUMPS;
  } else {
    player.isGrounded = false;
  }
}

// プレイヤーの状態を決める
function decideState() {
  if (!player.isGrounded) {
    if (player.vy < 0) {
      return "jump";
    }
    return "fall";
  }

  if (player.vx !== 0) {
    return "run";
  }

  return "idle";
}

// プレイヤーの更新
function updatePlayer(dt) {
  player.vx = 0;

  if (keys["ArrowRight"]) {
    player.vx = MOVE_SPEED;
  }

  if (keys["ArrowLeft"]) {
    player.vx = -MOVE_SPEED;
  }

  player.x = player.x + player.vx * dt;

  // 向き：動いているときだけ変更する
  if (player.vx > 0) {
    player.facing = 1;
  }

  if (player.vx < 0) {
    player.facing = -1;
  }

  const g = player.vy > 0
    ? GRAVITY * FALL_GRAVITY_RATE
    : GRAVITY;

  player.vy = player.vy + g * dt;
  player.y = player.y + player.vy * dt;

  if (keys["Space"] && player.jumpsLeft > 0) {
    player.vy = -JUMP_SPEED;
    player.jumpsLeft--;
    keys["Space"] = false;
  }

  collideWithFloor();

  // 動かし終わったら、今の状態を決める
  const newState = decideState();

  // 状態が変わったら、コマを最初に戻す
  if (newState !== player.state) {
    player.state = newState;
    player.frameIndex = 0;
    player.frameTimer = 0;
  }

  // コマ送り：今の状態のコマ数を使う
  player.frameTimer = player.frameTimer + dt;

  if (player.frameTimer >= FRAME_TIME) {
    player.frameIndex =
      (player.frameIndex + 1) % ANIMS[player.state].count;

    player.frameTimer = 0;
  }
}

// プレイヤーの描画
function drawPlayer() {
  // 黄色い四角形でプレイヤーを描画
  ctx.fillStyle = "#ffff00";

  ctx.fillRect(
    player.x,
    player.y,
    player.w,
    player.h
  );

  // デバッグ情報
  ctx.fillStyle = "#e8eeff";
  ctx.fillText(
    "vy = " + player.vy.toFixed(0) +
    "   jumpsLeft = " + player.jumpsLeft +
    "   state = " + player.state +
    "   frameIndex = " + player.frameIndex,
    10,
    20
  );
}