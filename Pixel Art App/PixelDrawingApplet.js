//piece editor for players

var xpixels = 10;
var ypixels = 25;
var pixelsize = 20;
var ScreenHeight = 900;
var ScreenWidth = 1000;

//noSmooth();
function setup() {
  // put setup code here
  createCanvas(ScreenWidth,ScreenHeight);
  background(255);
  hbm       = new HitBoxManager();
  grid      = new Grid(70,150,10,25,25);                                         //(x_pos,y_pos,xpixels,ypixels,size)
  pallete   = new ColorPallete(450,450,3);                                       //(x_pos,y_pos,size)
  slider    = new Slider(850,450,3);                                  //(x_pos,y_pos,size)
  chb       = new colorhistorybar(450,350,20,15);                     //(x_pos,y_pos,size,count)         
  var str1  = "Draw 2D Character";
  var str2  = "7/27/2018 - 8/4/2018";

  title     = new Text(400,10,500,100,color("black"),str1,"Times New Roman");     //(x,y,w,h,color,str,font)
  date      = new Text(400,100,500,40,color("black"),str2,"Times New Roman");


  function func1()  {pallete.chosencolor = color(0,0,0,0);}
  transparentbutton = new button(100,100,80,40,color("white"),"Transparent",func1); //(x,y,w,h,col,str,func)
  exportbutton      = new button(200,100,80,40,color(245,190,0),"Export",exportimage); 
  samplebutton      = new button(650,400,80,25,color(245,190,0),"Sample",pallete.samplecolor); 

}

function draw() {
  stroke(0);
  strokeWeight(1);
  background(255);
  title.draw();
  date.draw();

  grid.updateposition();
  pallete.updateposition();
  slider.updateposition();
  chb.draw();
  grid.drawgrid();
  pallete.drawpallete();
  slider.drawSlider();
  transparentbutton.draw();
  exportbutton.draw();
  samplebutton.draw();
  drawBorder(10,color("black"));

  // put drawing code here
}

function drawBorder(thickness,color){
 var t = thickness;
 fill(color); 
 rect(0,0,ScreenWidth,t);
 rect(0,0,t,ScreenHeight);
 rect(0,ScreenHeight,ScreenWidth,-t);
 rect(ScreenWidth,0,-t,ScreenHeight); 
}




///////////////////////////////////////////////////////////////////////////////////////
function mousePressed() { //called once
  if (pallete.sampler == true) {
    if (hbm.ReturnHitBoxObject(mouseX,mouseY) != samplebutton) pallete.samplechosen();
  }
  else {
    slider.GrabSliderCheck();
    pallete.ColorPickCheck();
    grid.DrawingCheck();
    hbm.CallEventFunction(mouseX,mouseY);
    /*
    var obj = hbm.ReturnHitBoxObject(mouseX,mouseY);
    if (obj != undefined) obj.clicked();
    */
    grid.grabber.checkIfGrabbing();
    pallete.grabber.checkIfGrabbing();
    slider.grabber.checkIfGrabbing();
  }
}


function mouseReleased() {
   slider.ReleaseSliderCheck();
   grid.grabber.ReleaseGrabber();
   pallete.grabber.ReleaseGrabber();
   slider.grabber.ReleaseGrabber();

  }

function mouseDragged() {
  grid.DrawingCheck();
}

///////////////////////////////////////////////////////////////////////////////////////
function exportimage() {
  var scale  = window.prompt("Scale multiplier to apply to the image: ","10");
  if (scale == null) return;

  var nPix_x = grid.Xpixels * scale;
  var nPix_y = grid.Ypixels * scale; 
  var img = createImage(nPix_x,nPix_y);
  img.loadPixels();

   for (var x = 0; x < nPix_x; x += 1) {
      for (var y = 0; y < nPix_y; y += 1) {
         var c = grid.colors[Math.floor(x/scale)][Math.floor(y/scale)];
         img.set(x,y,c); 
      }}
      
   img.updatePixels();
   save(img, 'character.png');
 }


//need to add 
//-numeric outputs for color Value        ***
//-button to color in transparent squares  done
//-change brush size  ***
//-log of last used colors                    done
//-toggle grid on screen and output
//-option to scale output dataset             done
//-button to export image data as a set of coordinate/color pairs. 

