var leftNavs = document.querySelectorAll('aside ul li');// 所有侧边导航li
// console.log(leftNavs);
var oFloors = document.querySelectorAll('.floor');// 所有内容楼层
// console.log(oFloors);
var floorLength = oFloors.length;//内容楼层个数

var floorOffsetTops = [];// 所有楼层offsetTop

// 遍历并把每个楼层div的offsetTop压入数组
for(var i = 0;i < oFloors.length; i++){
  floorOffsetTops.push(oFloors[i].offsetTop);
}
// console.log(floorOffsetTops);

// 把最后一层下边框的位置假装成存在下一层的offsetTop保存到floorOffsetTop里

floorOffsetTops.push(oFloors[floorLength-1].clientHeight + floorOffsetTops[floorLength-1]);


var nowFloor = NaN;// 表示当前楼层编号

window.onscroll = function(){
  // 滚动条滚动距离
  var scrollTops = document.body.scrollTop || document.documentElement.scrollTop;
  // 遍历依次判断offsettop和scrolltop关系，相等则能说明当前楼层号
  for(var i = 0; i < floorLength; i++){
    // 通过滚动条滚过的长度判断当前在那个楼层
    if(scrollTops >= floorOffsetTops[i]-100 && scrollTops < floorOffsetTops[i+1]-100){
      // 判断当前所在楼层的导航对应样式是否改变，满足条件，则还没有改变
      if(i != nowFloor){
        // 在nowFloor不是NaN的情况下去掉类名
        !isNaN(nowFloor) && (leftNavs[nowFloor].className = "");
        nowFloor = i;
        leftNavs[nowFloor].className = "cur";
      }
      break;
    }
  }
  // 判断当滚动条滚到最后一层楼，并滚出时，此时清除导航样式，信号量归NaN
  if (i === floorLength) {
    !isNaN(nowFloor) && (leftNavs[nowFloor].className = "");
    nowFloor = NaN;
  }
};

// 给侧边导航li批量添加点击事件
for(var i =0;i < leftNavs.length; i++){
  (function (idx){
    leftNavs[idx].onclick = function(){
      scrollAnimate(floorOffsetTops[idx],500);
    };
  })(i);
}


function scrollAnimate(target, time) {
  var frameNumber = 0;	//帧编号
  var start = document.body.scrollTop || document.documentElement.scrollTop;	 //起点
  var distance = target - start;
  var interval = 10;
  var maxFrame = time / interval;

  clearInterval(timer);
  var timer = setInterval(function () {
    frameNumber++;
    if (frameNumber == maxFrame) {
      document.body.scrollTop = document.documentElement.scrollTop = target;
      clearInterval(timer);
    }
    //第一个参数t表示当前帧编号
    //第二个参数b表示起始位置
    //第三个参数c表示变化量
    //第四个参数d表示总帧数
    //返回当前帧应该在哪儿
    document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frameNumber, start, distance, maxFrame);
  }, 10);


  function CubicEaseInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }
}