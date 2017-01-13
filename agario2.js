//Setup runs once at the beginning

var blob;
var blobs = [];
var zoom = 1;



function setup() {
  createCanvas(600,600);
  blob = new Blob(0, 0, 64);
  for (var i = 0; i < 100; i++) {
      var x = random(-width*2, width*2);
      var y = random(-height*2, height*2);
      blobs[i] = new Blob(x, y, 16);
  }
}
//Draw runs forever 
function draw() {
  background(0);

  translate(width/2, height/2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);

  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  blob.show();
  blob.move();
  for (var i = blobs.length-1; i >= 0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
  }
}



function Blob(x, y, r) {
    // Choose color
    if (r == 64) {
        var color = 255;
    } else {
        var color = '#'+ Math.random().toString(16).substr(-6); // Random color
    }

    // Vector with position
    this.pos = createVector(x, y);
    this.r = r; // radius
    this.vel = createVector(0,0);

    this.show = function () {
        // Drawing the blob
        fill(color);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }


    this.move = function() {
        // Move the blob with the mouse
        var newvel = createVector(mouseX-width/2, mouseY-height/2);
        newvel.setMag(3);
        this.vel.lerp(newvel, 0.2);
        this.pos.add(this.vel);
    }

    this.eats = function(other) {
      var d = p5.Vector.dist(this.pos, other.pos);
      if (d < this.r + other.r) {
        var sum_areas = PI * pow(this.r, 2) + PI * pow(other.r, 2);
        this.r = sqrt(sum_areas / PI);
        blobs.push(new Blob(random(-width*2, width*2), random(height*2, -height*2), 16));
        return true;
      } else {
        return false;
      }
    }
}



