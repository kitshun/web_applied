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

    if (enemy.type === "notice") {
      const playerCenterX = player.x + player.w / 2;
      const playerCenterY = player.y + player.h / 2;

      const enemyCenterX = enemy.x + enemy.w / 2;
      const enemyCenterY = enemy.y + enemy.h / 2;

      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= NOTICE_RANGE) {

        if (enemy.vx > 0) {
          enemy.vx = NOTICE_SPEED;
        } else if (enemy.vx < 0) {
          enemy.vx = -NOTICE_SPEED;
        }
      }
    }
