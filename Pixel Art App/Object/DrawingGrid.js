/////////////////////////////////////////////////////////////////////////////////////////////
// Drawing grid class
/////////////////////////////////////////////////////////////////////////////////////////////

function Grid(x_pos,y_pos,xpixels,ypixels,size) {
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.Size  = size;
  this.Xpixels = xpixels;
  this.Ypixels = ypixels;
  this.w = this.Size * this.Xpixels;
  this.h = this.Size * this.Ypixels;
  this.colors = [];
  this.grabber = new Grabber(this.x_pos,this.y_pos,-10,-10);

  //initialize colors to transparent
  for(var i = 0; i <= this.Xpixels; i++) {this.colors.push([]) };

  for (var x = 0; x < this.Xpixels; x += 1) {
      for (var y = 0; y < this.Ypixels; y += 1) {
         this.colors[x][y] = color(0,0,0,0);
      }}

  this.drawgrid = function(){
    this.grabber.draw();
    strokeCap(SQUARE);
    strokeWeight(1);
    stroke(0);
    for (var x = 0; x < this.Xpixels; x += 1) {
      for (var y = 0; y < this.Ypixels; y += 1) {
        fill(this.colors[x][y]);
        if (alpha(this.colors[x][y]) == 0) {
           drawTransparency(this.x_pos + x*this.Size,this.y_pos + y*this.Size,this.Size,this.Size); }
        else rect(this.x_pos + x*this.Size,this.y_pos + y*this.Size,this.Size,this.Size);
      }
    }
  }

  this.updateposition = function(){
    if (this.grabber.grabbed) {
      var x = mouseX;
      var y = mouseY;
      this.grabber.updateposition(x,y);
      this.x_pos = this.grabber.x_ref;
      this.y_pos = this.grabber.y_ref;
    }
  }
  
  this.DrawingCheck = function(){
     var x = mouseX;
     var y = mouseY;
     var XinRange = ((this.x_pos <= x) && (x <= (this.x_pos + this.w)));
     var YinRange = ((this.y_pos <= y) && (y <= (this.y_pos + this.h)));
     if (XinRange && YinRange) {
      var x_cor = Math.floor((x-this.x_pos)/this.Size);
      var y_cor = Math.floor((y-this.y_pos)/this.Size);
      this.colors[x_cor][y_cor] = pallete.chosencolor;
     }
  }

}
