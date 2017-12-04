
var interval = 20;

var oRolling = document.getElementById("rolling");
var oUnit = document.getElementById("rolling-unit");// 大管子
var imgUl = document.getElementsByTagName("ul")[0];// ul
var tupians = imgUl.getElementsByTagName("img");


var zheFanDian;// 折返点

imgUl.innerHTML += imgUl.innerHTML;// 将ul中的li复制一倍

var imgLis = imgUl.getElementsByTagName("li");// 一套图片的长度（个数）
var imgLength = imgLis.length;// 获取li数组和长度应在复制一遍以后


var nowLeft = 0;// 当前left值
var timer;// 计时器

var count = 0;// 计数器，用来记录图片已加载个数
for (var i = 0; i < tupians.length; i++) {
  tupians[i].onload = function () {
    count++;
    if (count === tupians.length) {
      zheFanDian = imgLis[imgLength / 2].offsetLeft;
      move();// 调用移动函数
    }
  }
}

oRolling.onmouseover = function () {
  clearInterval(timer);// 鼠标划上可见区域时，运动停止
};
oRolling.onmouseout = function () {
  move(); // 鼠标离开时，继续运动
};

function move() {
  timer = setInterval(function () {
    nowLeft -= 5;
    if (nowLeft < -zheFanDian) {// 第二套第一张图片的offsetLeft
      nowLeft = 0;
    }
    oUnit.style.left = nowLeft + 'px';
  }, interval);
}