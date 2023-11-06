let ball;
      let leftPaddle;
      let rightPaddle;
      let leftScore = 0;
      let rightScore = 0;

      function setup() {
        createCanvas(800, 400);
        ball = new Ball();
        leftPaddle = new Paddle(true);
        rightPaddle = new Paddle(false);
      }

      function draw() {
        background(0);
        ball.show();
        ball.update();
        leftPaddle.show();
        rightPaddle.show();
        leftPaddle.update();
        rightPaddle.update();

        // Verifica as colisões entre a bola e as raquetes
        leftPaddle.checkCollision(ball);
        rightPaddle.checkCollision(ball);

        // Verifica se a bola saiu da tela
        if (ball.isOffScreen()) {
          if (ball.x < 0) {
            rightScore++;
          } else {
            leftScore++;
          }
          ball.reset();
        }

        // Exibe os pontos na tela
        textSize(32);
        fill(255);
        text(leftScore + " - " + rightScore, width / 2 - 30, 30);
      }

      class Ball {
        constructor() {
          this.x = width / 2;
          this.y = height / 2;
          this.speedX = random(6, 5) * (random() > 2.5 ? 2 : -2);
          this.speedY = random(6, 5) * (random() > 2.5 ? 2 : -2);
          this.radius = 10;
        }

        show() {
          fill(255);
          noStroke();
          ellipse(this.x, this.y, this.radius * 2);
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.y < 0 || this.y > height) {
            this.speedY *= -1;
          }
        }

        isOffScreen() {
          return this.x < 0 || this.x > width;
        }

        reset() {
          this.x = width / 2;
          this.y = height / 2;
          this.speedX = random(3, 5) * (random() > 0.5 ? 1 : -1);
          this.speedY = random(2, 4) * (random() > 0.5 ? 1 : -1);
        }
      }

      class Paddle {
        constructor(isLeft) {
          this.width = 10;
          this.height = 80;
          this.isLeft = isLeft;
          this.y = height / 2 - this.height / 2;
          this.x = isLeft ? 0 : width - this.width;
          this.speed = 5;
        }

        show() {
          fill(255);
          noStroke();
          rect(this.x, this.y, this.width, this.height);
        }

        update() {
          if (this.isLeft) {
            if (keyIsDown(87) && this.y > 0) {
              this.y -= this.speed;
            }
            if (keyIsDown(83) && this.y < height - this.height) {
              this.y += this.speed;
            }
          } else {
            if (keyIsDown(UP_ARROW) && this.y > 0) {
              this.y -= this.speed;
            }
            if (keyIsDown(DOWN_ARROW) && this.y < height - this.height) {
              this.y += this.speed;
            }
          }
        }

        checkCollision(ball) {
          if (
            ball.x < this.x + this.width &&
            ball.x > this.x &&
            ball.y > this.y &&
            ball.y < this.y + this.height
          ) {
            ball.speedX *= -1;
          }
        }
      }
