var smallPic = document.querySelector('.smallpic');// 小图框
var magnifier = document.querySelector('.fangda');// 放大块
var bigPic = document.querySelector('.bigpic');// 大图框


// 放大块移动距离 / 大图框背景图移动距离
var moveBorder1 = parseFloat(getComputedStyle(magnifier)['width']);
var moveBorder2 = parseFloat(getComputedStyle(bigPic)['width']);
var rate = moveBorder1 / moveBorder2;

smallPic.onmouseover = function () {
  magnifier.style.display = 'block';
  bigPic.style.display = 'block';
}
smallPic.onmouseout = function () {
  magnifier.style.display = 'none';
  bigPic.style.display = 'none';
}

smallPic.onmousemove = function (event) {
  event = event || window.event;
  // var x  = event.offsetX;
  // var y  = event.offsetY;

  // var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
  // var scrollleft = document.body.scrollLeft || document.documentElement.scrollLeft;


  var y = event.clientY - this.offsetTop - magnifier.clientHeight / 2;
  var x = event.clientX - this.offsetLeft - magnifier.clientWidth / 2;

  if (x < 0) { x = 0; }
  if (y < 0) { y = 0; }
  if (x > smallPic.clientWidth - magnifier.clientWidth) { x = smallPic.clientWidth - magnifier.clientWidth; }
  if (y > smallPic.clientHeight - magnifier.clientHeight) { y = smallPic.clientHeight - magnifier.clientHeight; }

  magnifier.style.top = y + 'px';
  magnifier.style.left = x + 'px';

  bigPic.style.backgroundPosition = (-x / rate) + 'px ' + (-y / rate) + 'px';
}