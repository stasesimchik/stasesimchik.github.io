document.getElementById('menu-btn').onclick = function(){
  var display = document.getElementById('menu').style.display;
  if(display == 'inline-block'){
    document.getElementById('menu').style.display = 'none';
  }else{
    document.getElementById('menu').style.display = 'inline-block';
  }
}
