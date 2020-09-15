///////////////////////////////////////////////////////////////////////////////////////
// Hue Slider class


///////////////////////////////////////////////////////////////////////////////////////
function Slider(x_pos,y_pos,size) {
   this.x_pos = x_pos;
   this.y_pos = y_pos;
   this.Size  = size;
   this.Value = 0;
   this.lineH = 100;
   this.lineW = 3;
   this.ballR = 20;
   this.held    = false;
   this.ballX = this.x_pos + .5 * this.lineW * this.Size;
   this.ballY = this.y_pos;
   this.grabdistance = 20;
   this.grabber = new Grabber(this.x_pos,this.y_pos,-20,-20);

   this.drawSlider = function() {
    //draw corner grabber
    this.grabber.draw();

    //line
    fill(0);
    var w = this.lineW * this.Size;
    var h = this.lineH * this.Size; 
    rect(this.x_pos,this.y_pos, w, h);
  
    //ball
    fill(color("red"));
    if (this.held) this.moveSlider();
    ellipse(this.ballX,this.ballY,this.ballR);
   }
 
   this.moveSlider = function() {
      var y = mouseY;
      var max = this.y_pos + this.lineH * this.Size;
      var min = this.y_pos;
      if      (y > max) this.ballY = max;
      else if (y < min) this.ballY = min;
      else              this.ballY = y;
      this.Value = Math.floor((this.ballY - this.y_pos) / this.Size);
   }

  this.updateposition = function(){
    if (this.grabber.grabbed) {
      var x = mouseX;
      var y = mouseY;
      this.grabber.updateposition(x,y);
      this.x_pos = this.grabber.x_ref;
      this.y_pos = this.grabber.y_ref;
      this.ballX = this.x_pos + .5 * this.lineW * this.Size;
      this.ballY = this.y_pos;
    }
  }
  
   this.ReleaseSliderCheck = function() {
    if (this.held)  this.held = false;
   }

   this.GrabSliderCheck = function() {
    var xdif  = abs(mouseX - this.ballX);
    var ydif  = abs(mouseY - this.ballY);
    var error = this.grabdistance + this.ballR;

    if (xdif < error && ydif < error) this.held = true;
    else                                this.held = false;
   }

}