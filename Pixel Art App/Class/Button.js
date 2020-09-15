///////////////////////////////////////////////////////////////////////////////////////
// Button class


///////////////////////////////////////////////////////////////////////////////////////
function button(x,y,w,h,col,str,func){
   this.x_pos = x;
   this.y_pos = y;
   this.W     = w;
   this.H     = h;
   this.col   = col;
   this.str   = str;
   this.clickfunction  = func;
   this.txt   =  new Text(x,y,w,h,color(0),str,"Times New Roman");
   this.hitbox = hbm.CreateHitBox(this,x,y,w,h,this.clickfunction);

   this.draw = function() {
      strokeWeight(3);
      stroke(0);
      strokeCap(ROUND);

      if (hbm.ReturnHitBoxObject(mouseX,mouseY) == this) {
        colorMode(HSB,100);
        var c = color(hue(this.col),saturation(this.col),brightness(this.col)*.8);
        fill(c);
        colorMode(RGB,255);
      } 
      else fill(this.col);
      rect(this.x_pos,this.y_pos,this.W,this.H);
      strokeWeight(1);
      this.txt.draw();
      strokeCap(SQUARE);
      strokeWeight(1);
   }
}
