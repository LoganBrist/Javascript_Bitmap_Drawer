/////////////////////////////////////////////////////////////////////////////////////////////
// Hit Box Manager Class
//
// Holds a list of object hitboxes on the screen.
// 
// User functions:
// CreateHitbox(obj,x,y,w,h)- Creates a hitbox with passed dimensions for the passed object, and returns reference to the hitbox.
// BumpHitBoxToForeground(hbox)- Needs called manually when an object is drawn, passing the object's hitbox as reference. 
//                           This ensures most recently drawn objects are detected first in layered cases, if their 
//                           region is clicked on.
// FindHitBox(mousex,mousey)- Returns reference to the screen object on the passed coordinates. Meant to be called when
//                            any mouse click event occurs., passing mousex and mousey and recieving the object for further use.
/////////////////////////////////////////////////////////////////////////////////////////////
//Hit box manager class
function HitBoxManager(){
  this.HitBoxes  = [];
  
  this.CreateHitBox = function(obj,x,y,w,h,func){
      var hbox = new HitBox(obj,x,y,w,h,func);
      this.AddToHitBoxList(hbox);
      return hbox;
  }

  this.BumpHitBoxToForeground = function(hbox){
     this.RemoveFromHitBoxList(hbox);
     this.AddToHitBoxList(hbox);
  }

  this.AddToHitBoxList = function(hbox){
     this.HitBoxes.unshift(hbox);
  }

  this.RemoveFromHitBoxList = function(hbox){
     var index = this.HitBoxes.indexOf(hbox);
     if (index > -1) this.HitBoxes.splice(index,1);
  }

  this.ReturnHitBox = function(mouse_x,mouse_y) {
   for (var i = 0; i < this.HitBoxes.length; i++){
      var hbox  = this.HitBoxes[i];
      var X = hbox.X;
      var Y = hbox.Y;
      var W = hbox.W;
      var H = hbox.H;
      var test1 = (X <= mouse_x);
      var test2 = (Y <= mouse_y);
      var test3 = (mouse_x <= X + W);
      var test4 = (mouse_y <= Y + H);

      if (test1 && test2 && test3 && test4) return hbox;
    }
    return -1;
  }

  this.ReturnHitBoxObject = function(mouse_x,mouse_y) {
      var hbox = this.ReturnHitBox(mouse_x,mouse_y);
      if (hbox == -1) return -1;
      else            return hbox.obj;
  }

  this.CallEventFunction = function(mouse_x,mouse_y) {
      var hbox = this.ReturnHitBox(mouse_x,mouse_y);
      if (hbox == -1) return;
      else            hbox.ClickFunction();
   }
 }


/////////////////////////////////////////////////////////////////////////////////////////////
// Hit Box Class
//
// For any drawn object, holds a reference to the object and the object's hitbox location and dimensions.
// - Each object with a hitbox needs to manually call UpdatePosition() for their hitbox when its moved.  
// - A hit box is automatically created when CreateHitBox() is called from HitboxManager.
/////////////////////////////////////////////////////////////////////////////////////////////
//Hit box class, created at each object
 function HitBox(obj,x,y,w,h,func) {
    this.X = x;
    this.Y = y;
    this.W = w;
    this.H = h;
    this.obj = obj;
    this.f = func;

    this.ClickFunction = function(){
      this.f();
    }

    this.UpdatePosition = function(x,y) {
     this.X = x;
     this.Y = y;
    }
 }