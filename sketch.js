let seed;
const numberParticle = 2000
let scalar = 1;
let speed = 0.03;
let speedScalar = 0.1;
let step = 1;
let particles = []
const blackholeRadius = 150

function preload() {
  seed = random(99999)
}

function setup() {
  createCanvas(1920, 1080)
  for(let i = 0; i < numberParticle; i++) {
    const x = int(random(-1500, 1500))
    const z = int(random(-1500, 1500))
    const scalar = dist(x,z,0,0)
    const a = atan2(z, x)
    particles.push({
      a,
      scalar,
      previous: createVector(scalar * cos(a), scalar * .35 * sin(a))
    })
  }
}

function draw() {
  background('black')
  fill(1)
  noStroke()
  randomSeed(seed);
  translate(width/2, height/2)
  circle(0,blackholeRadius/2,blackholeRadius*2)
  for(let i = 0; i < particles.length; i++) {
    noFill()
    stroke(255)
    let scalar = particles[i].scalar - speedScalar
    const y = scalar < 500 ? map(scalar, blackholeRadius, 500, blackholeRadius/2, 0) : 0
    const x = cos(particles[i].a) * particles[i].scalar
    const z = sin(particles[i].a) * .35 * particles[i].scalar + y
    strokeWeight(map(z, -600, 600, 1, 5))
    if(z > 50 || dist(x,z,0,blackholeRadius/2)>blackholeRadius) {
      line(x,z,particles[i].previous.x,particles[i].previous.y)
    }
    if(scalar <= blackholeRadius) {
      scalar = dist(int(random(-1500, 1500)),int(random(-1500, 1500)),0,0)
      const a = random(TWO_PI)
      particles[i] = {
        a,
        scalar,
        previous: createVector(scalar * cos(a), scalar * .35 * sin(a))
      }
    } else {
      particles[i] = {
        a: particles[i].a + map(scalar, blackholeRadius, 1500, speed*1.2, -speed/5),
        scalar,
        previous: createVector(x, z)
      }
    }
  }
}

function keyPressed(key) {
  console.log(key)
  if(key.keyCode === 80)
    saveCanvas(canvas, 'random_walk_color', 'png')
}
