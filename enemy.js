function createEnemy(x, vx) {
  return {
    x: x,
    y: 300,
    w: 32,
    h: 32,
    vx: vx,
    alive: true,
  };
}

let enemies = [];

enemies.push(createEnemy(200, 80));
enemies.push(createEnemy(380, -120));
enemies.push(createEnemy(540, 60));

function updateEnemies(dt) {
  for (const enemy of enemies) {
    enemy.x = enemy.x + enemy.vx * dt;

    // 画面端に着いたら進行方向を反転する
    if (enemy.x < 0) {
      enemy.x = 0;
      enemy.vx = -enemy.vx;
    }

    if (enemy.x + enemy.w > canvas.width) {
      enemy.x = canvas.width - enemy.w;
      enemy.vx = -enemy.vx;
    }
  }
}

function drawEnemies() {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;

    ctx.fillStyle = "red";
    ctx.fillRect(
      enemy.x,
      enemy.y,
      enemy.w,
      enemy.h
    );
  }
}

function collideWithEnemies(prevBottom) {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;

    if (
      aabb(player, enemy) &&
      prevBottom <= enemy.y &&
      player.vy > 0
    ) {
      enemy.alive = false;
      player.vy = -JUMP_SPEED / 2;
    }
  }

  // 倒した敵を配列から取り除く
  enemies = enemies.filter((enemy) => enemy.alive);
}