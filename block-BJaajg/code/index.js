let canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;

canvas.height = innerHeight;

const scoreElm = document.querySelector('#score');
const start = document.querySelector('#startGame');
const model = document.querySelector('#model');
const point = document.querySelector('#point');

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

const friction = 0.99;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

var x = canvas.width / 2;
var y = canvas.height / 2;
const player = new Player(x, y, 15, 'white');

let projectiles = [];
let enemies = [];
let particles = [];

function init() {
  score = 0;
  projectiles = [];
  enemies = [];
  particles = [];
  scoreElm.innerHTML = score;
  point.innerHTML = score;
}

function spawnEnemy() {
  setInterval(() => {
    const radius = Math.random() * (25 - 8) + 8;
    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      //  y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      y = Math.random() * canvas.height;
    } else {
      x = y = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = `hsl(${Math.random() * 360},50%,50%)`;

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

let animateId;
let score = 0;
function animate() {
  animateId = requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });
  projectiles.forEach((elm, index) => {
    elm.update();
    if (
      elm.x + elm.radius < 0 ||
      elm.x - elm.radius > canvas.width ||
      elm.y + elm.radius < 0 ||
      elm.y - elm.radius > canvas.height
    ) {
      projectiles.splice(index, 1);
    }
  });
  enemies.forEach((enemy, index) => {
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - enemy.radius - player.radius < 1) {
      // console.log('end game');
      cancelAnimationFrame(animateId);
      point.innerHTML = score;
      model.style.display = 'flex';
    }
    projectiles.forEach((project, i) => {
      const dist = Math.hypot(project.x - enemy.x, project.y - enemy.y);

      // when projectile hit enemy
      if (dist - enemy.radius - project.radius < 1) {
        // create particle
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(project.x, project.y, Math.random() * 2, enemy.color, {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6),
            })
          );
        }
        if (enemy.radius - 10 > 8) {
          score += 100;
          scoreElm.innerHTML = score;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          projectiles.splice(i, 1);
        } else {
          score += 250;
          scoreElm.innerHTML = score;
          enemies.splice(index, 1);
          projectiles.splice(i, 1);
        }
      }
    });
  });
}

addEventListener('click', (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  console.log(angle);
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  // console.log(velocity);
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity)
  );
});

start.addEventListener('click', () => {
  init();
  animate();
  spawnEnemy();
  model.style.display = 'none';
});
