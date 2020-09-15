///////////////////////////////////////////////////////////////////////////////////////
// Corner Grabbing class


///////////////////////////////////////////////////////////////////////////////////////

function Grabber(x_pos,y_pos,xoff,yoff) {
  this.w = 10;
  this.h = 10;
  this.c = color("red");
  this.x_pos = x_pos + xoff;
  this.y_pos = y_pos + yoff;
  this.x_ref = x_pos; //the position of the piece the grabber controls
  this.y_ref = y_pos; //the position of the piece the grabber controls
  this.x_off = xoff;
  this.y_off = yoff;
  this.grabbed = false;

  this.checkIfGrabbing = function() {
     var x = mouseX;
     var y = mouseY;
     var XinRange = ((this.x_pos - this.w/2 <= x) && (x <= (this.x_pos + this.w/2)));
     var YinRange = ((this.y_pos - this.h/2 <= y) && (y <= (this.x_pos + this.w/2)));
    if (XinRange && YinRange) this.grabbed = true;
  }

   this.ReleaseGrabber = function() {
    this.grabbed = false;
   }

  this.draw = function() {
     fill(this.c);
     rectMode(CENTER);
     rect(this.x_pos,this.y_pos,this.w,this.h);
     rectMode(CORNER);
  }

  this.updateposition = function(x,y) {
     this.x_pos = x;
     this.y_pos = y;
     this.x_ref = x - xoff; 
     this.y_ref = y - yoff; 
  }

}