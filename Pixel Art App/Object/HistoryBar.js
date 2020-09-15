///////////////////////////////////////////////////////////////////////////////////////
// Color History Bar class

 
///////////////////////////////////////////////////////////////////////////////////////
function colorhistorybar(x_pos,y_pos,size,count){
   this.x_pos = x_pos;
   this.y_pos = y_pos;
   this.w     = size * count;
   this.h     = size;
   this.Size  = size;
   this.count = count;
   this.colorhistory = [];

   this.clicked = function() {
     pallete.setchosencolor(get(mouseX,mouseY));
   }
   var self = this;
   this.hitbox =  hbm.CreateHitBox(self,x_pos,y_pos,this.w,this.h, self.clicked);

  this.addtocolorhistory = function(color){
     if (arrayincludes(this.colorhistory,color) == false) this.colorhistory.unshift(color);
     if (this.colorhistory.length > this.count) this.colorhistory.pop(); 
  }
   this.draw = function() {
     for (var i = 0; i < this.count; i++) {
        var col = this.colorhistory[i];
        if (col == undefined) fill(color("white"));
        else                  fill(this.colorhistory[i]);
        rect(this.x_pos + this.Size * i, this.y_pos, this.Size, this.Size);
     }
   }
}
