///////////////////////////////////////////////////////////////////////////////////////
// Color Choosing Pallete class

 
///////////////////////////////////////////////////////////////////////////////////////
function ColorPallete(x_pos,y_pos,size) {
  this.Size  = size;
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.HSBrange = 100;
  this.w     = this.HSBrange * this.Size; 
  this.h     = this.HSBrange * this.Size;
  this.hue;
  this.borderthickness = 10;
  this.bordercolor = color("grey");
  this.chosencolor = color("white");
  this.colorhistory = [];
  this.grabber = new Grabber(this.x_pos,this.y_pos,-20,-20);
  this.sampler = false;
  var self     = this;

  this.drawpallete = function() {
    //corner grabber
    this.grabber.draw();

    //border
    fill(this.bordercolor);
    var x0 = this.x_pos - this.borderthickness;
    var x1 = this.w + 2 * this.borderthickness;
    var y0 = this.y_pos - this.borderthickness;
    var y1 = this.h + 2 * this.borderthickness;
    rect(x0,y0,x1,y1);

    //pallete
    noStroke();
    colorMode(HSB, this.HSBrange);
    this.hue = slider.Value;
    for (var x = 0; x < this.HSBrange; x++){
      for (var y = 0; y < this.HSBrange; y++){
        fill(color(this.hue,x,y)); 
        rect(this.x_pos + x*this.Size,this.y_pos + y*this.Size,this.Size,this.Size);    
      }
    }
    colorMode(RGB,255);
    stroke(0);
    strokeWeight(1);

    //ISSUE NOTICE: sampling uses get() to get the color under the mouse. If the icon is drawn below the mouse,
    // black will be mistakenly recorded. Removing the pixel under the cursor solves this, unless there is mouse lag.
    // If this happens, there may be an offset between the drawn cursor and the mouse coordinates, causing wrong color. 
    //sampler mouse icon
    if (this.sampler == true) {
      var x  = mouseX;
      var y  = mouseY;
      line(x-3,y-3,x-1,y-1);
      line(x+1,y+1,x+3,y+3);
      line(x-3,y+3,x-1,y+1);
      line(x+1,y-1,x+3,y-3);
    }

    //chosen color box
    fill(this.chosencolor);
    if(alpha(this.chosencolor) == 0) drawTransparency(this.x_pos,this.y_pos-50,this.w/2,25);
    else                                         rect(this.x_pos,this.y_pos-50,this.w/2,25);
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
  
  this.setchosencolor = function(color){
     this.chosencolor = color;
     chb.addtocolorhistory(color);
  }

  this.ColorPickCheck = function() {
    var x = mouseX;
    var y = mouseY;
    var XinRange = ((this.x_pos <= x) && (x <= (this.x_pos + this.w)));
    var YinRange = ((this.y_pos <= y) && (y <= (this.y_pos + this.h)));
    if (XinRange && YinRange) this.setchosencolor(get(x,y));
  }

  this.samplecolor = function() { 
     self.sampler = true;
     console.log("sampler set to", self.sampler);
     //this function sets sampler to true but then it stays false outside of the function 
  }

  this.samplechosen = function() {
    var x = mouseX;
    var y = mouseY;
    self.chosencolor = get(x,y); 
    self.sampler = false;
  }
}

//choose square color off of origin to ensure compatible squares
function drawTransparency(x,y,w,h){
    noStroke();
    var size  = 5;
    var x_cnt = w / size;
    var y_cnt = h / size;
    var x_remainder = w % size;
    var y_remainder = h % size;
    var x_cap = w - x_remainder;
    var y_cap = h - y_remainder;
    var colour;


    //full fitting squares
    for (var col = 0; col < x_cnt; col += 1) {
      for (var row = 0; row < y_cnt; row += 1) {

       if((col + row) % 2 == 0) {colour = color(255);}        
       else                     {colour = color(150);}   
       fill(colour); 
       rect(x + col*size,y+ row*size,size,size);
      }
    }
    
    //remaining area
    for (var col = 0; col < x_cnt; col += 1) {
       if((col+ y_cnt) % 2 == 0) {colour = color(255);}        
       else                      {colour = color(150);}
      fill(colour); 
      rect(x + col*size,y_cap,size,y_remainder);
    }

    for (var row = 0; row < y_cnt; row += 1) {
       if((x_cnt+row) % 2 == 0)  {colour = color(255);}        
       else                      {colour = color(150);}
      fill(colour);        
      rect(x_cap,y + row*size,x_remainder,size);
    }
stroke(1);    
noFill();
rect(x,y,w,h);


}