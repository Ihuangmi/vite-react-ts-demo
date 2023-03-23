// Set up canvas
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Set up fireworks
const fireworks = [];
const particles = [];

function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.radius = 2;
    this.velocity = {
        x: Math.random() * 6 - 3,
        y: Math.random() * 3 + 3
    };
    this.gravity = 0.1;
    this.life = true;
}

Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Firework.prototype.update = function () {
    this.x += this.velocity.x;
    this.y -= this.velocity.y;
    this.velocity.y -= this.gravity;
    if (this.velocity.y <= 0) {
        this.life = false;
        createParticles(this.x, this.y);
    }
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.radius = Math.random() * 2;
    this.velocity = {
        x: Math.random() * 6 - 3,
        y: Math.random() * 6 - 3
    };
    this.gravity = 0.1;
    this.life = 100;
}

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Particle.prototype.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += this.gravity;
    this.life -= 1;
}

function createParticles(x, y) {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.draw();
        firework.update();
        if (!firework.life) {
            fireworks.splice(index, 1);
        }
    });

    particles.forEach((particle, index) => {
        particle.draw();
        particle.update();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    requestAnimationFrame(animate);
}

animate();
