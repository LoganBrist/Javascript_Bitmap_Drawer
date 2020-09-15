///////////////////////////////////////////////////////////////////////////////////////
// Array Includes function 
//
//checks if an array has an element of n-length.
///////////////////////////////////////////////////////////////////////////////////////

function arrayincludes(arr,element) {
  var len   = arr.length;
  var depth = element.length;

  for (var i = 0; i < len; i++) {
      for(var j = 0; j < depth; j++) {
         if (arr[i][j] != element[j]) break;
         else if (j == depth - 1) return true;
      }
  }
  return false;
}