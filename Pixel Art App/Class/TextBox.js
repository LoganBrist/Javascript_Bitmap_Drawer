///////////////////////////////////////////////////////////////////////////////////////
//  Text Box Class 
//
//Prints text in the center of a box with dimensions x,y,w,h.
///////////////////////////////////////////////////////////////////////////////////////
  function Text(x,y,w,h,col,str,font) {
    this.xbuf  = 5; //5 pixel buffer from edge of region
    this.ybuf  = 2;
    this.x_pos = x + this.xbuf;
    this.y_pos = y + this.ybuf;
    this.w     = w - this.xbuf*2;  
    this.h     = h - this.ybuf*2;
    this.c     = col;
    this.str   = str;
    this.font  = font;

    //Reach largest possible font size
    var txt_h = 0;
    var txt_w = 0;
    var size  = 0;
    while(txt_w < this.w && txt_h < this.h) {
      size++;
      textSize(size);
      txt_w = textWidth(this.str);
      txt_h = textDescent() + textAscent();
    }
    this.Size  = size;

  this.draw = function() {
      fill(this.c);
      textSize(this.Size);
      textFont(this.font);
      textAlign(CENTER,CENTER);
      text(this.str,this.x_pos+.5*this.w,this.y_pos+.5*this.h);
  }

}

