document.getElementById('menu-btn').onclick = function(){
  var display = document.getElementById('menu-list').style.display;
  if(display == 'block'){
    document.getElementById('menu-list').style.display = 'none';
  }else{
    document.getElementById('menu-list').style.display = 'block';
  }
};

document.getElementById('cardBtn').onclick = function(){
  var display = document.getElementById('cardList').style.display;
  if(display == 'block'){
    document.getElementById('cardList').style.display = 'none';
  }else{
    document.getElementById('cardList').style.display = 'block';
  }
};
