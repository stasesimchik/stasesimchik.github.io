document.getElementById('menu-btn').onclick = function(){
  var display = document.getElementById('menu-list').style.display;
  if(display == 'block'){
    document.getElementById('menu-list').style.display = 'none';
  }else{
    document.getElementById('menu-list').style.display = 'block';
  }
};
