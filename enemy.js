const NOTICE_RANGE = 150;
const NOTICE_SPEED = 240;

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

const special = createEnemy(300, 80);
special.type = "notice";
enemies.push(special);

function updateEnemies(dt) {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;

    // 気づく敵の処理
    if (enemy.type === "notice") {
      const playerCenterX = player.x + player.w / 2;
      const playerCenterY = player.y + player.h / 2;

      const enemyCenterX = enemy.x + enemy.w / 2;
      const enemyCenterY = enemy.y + enemy.h / 2;

      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // プレイヤーが一定範囲に入ったら速度を上げる
      if (distance <= NOTICE_RANGE) {
        if (enemy.vx > 0) {
          enemy.vx = NOTICE_SPEED;
        } else if (enemy.vx < 0) {
          enemy.vx = -NOTICE_SPEED;
        }
      }
    }

    // 敵の移動
    enemy.x = enemy.x + enemy.vx * dt;

    // 左端に着いたら反転
    if (enemy.x < 0) {
      enemy.x = 0;
      enemy.vx = -enemy.vx;
    }

    // 右端に着いたら反転
    if (enemy.x + enemy.w > canvas.width) {
      enemy.x = canvas.width - enemy.w;
      enemy.vx = -enemy.vx;
    }
  }
}

function drawEnemies() {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;

    // 気づく敵はオレンジ、通常の敵は赤
    if (enemy.type === "notice") {
      ctx.fillStyle = "orange";
    } else {
      ctx.fillStyle = "red";
    }

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