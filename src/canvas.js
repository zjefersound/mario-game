import platformImg from "../assets/platform.png";
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const gravity = 1.5;
const c = canvas.getContext("2d");

console.log(c);

class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
const image = new Image();
image.src = platformImg;

const player = new Player();
const platforms = [
  new Platform({ x: 200, y: 500, image }),
  new Platform({ x: 500, y: 450, image }),
  new Platform({ x: 800, y: 550, image }),
];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();


  if (keys.right.pressed && player.position.x < 500) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  // Platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  if (scrollOffset > 2500) {
    console.log("You win");
  }
}
animate();

addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: {
      keys.left.pressed = true;
      console.log("left");
      break;
    }
    case 39: {
      keys.right.pressed = true;
      console.log("right");
      break;
    }
    case 38: {
      player.velocity.y -= 20;
      console.log("up");
      break;
    }
    case 40: {
      console.log("down");
      break;
    }
  }
});

addEventListener("keyup", (event) => {
  switch (event.keyCode) {
    case 37: {
      keys.left.pressed = false;
      console.log("left up");
      break;
    }
    case 39: {
      console.log("right up");
      keys.right.pressed = false;
      break;
    }
  }
});
