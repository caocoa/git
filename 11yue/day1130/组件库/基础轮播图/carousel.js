// 定义一些常用量
var singleWidth = 720;// 一张图宽度
var animateTime = 600;// 动画过程时间
var tweenStyle = 'Linear';// 缓冲动画样式
var interval = 2600;// 每隔interval切换一次图片


// **************************************************************************************************
/* Version 0.1   实现普通的移动 */
/* Version 1.0   添加透明度改变 */
/* Version 1.1   把回调函数中的this指向elem */
/* Version 2.0   添加参数判断和处理，添加缓冲动画，变量名的改变 */
/* Version 2.1   解决Tween中方法互相调用因名字导致的问题*/

/**
 * 包含运动和透明度改变的函数
 * @param elem 要运动的html元素
 * @param targetJSON {JSON} 运动终止时的属性值
 * @param time 单位是毫秒，运动经历的总时间
 * @param tweenString 缓冲动画类中的方法名字符串，例如"Linear"
 * @param callback 回调函数，运动结束后执行的函数
 */
function animate(elem, targetJSON, time, tweenString, callback) {
  // 判断参数情况，根据不同情况为参数赋默认值
  if (arguments.length < 3 ||
    typeof arguments[0] !== 'object' ||
    typeof arguments[1] !== 'object' ||
    typeof arguments[2] !== 'number') {     //   参数少于3个及类型错误的处理
    throw new Error("对不起，您传入的参数类型有误或者个数不足，请重新传参");
    return;
  } else if (arguments.length === 3) { // 恰好传3个参数，则后两个参数的默认情况
    tweenString = 'Linear';
    callback = null;
  } else if (arguments.length === 4) { // 恰好传4个参数，第四个参数根据类型分情况处理
    switch (typeof arguments[3]) {
      case 'string':
        callback = null;
        break;
      case 'function':
        tweenString = 'Linear';
        break;
      default:
        throw new Error("对不起，第四个参数只能传字符串或者函数！");
        break;
    }
  }
  // 为函数节流做准备，为true表示可以运动，为false时表示不能运动或运动停止
  elem.isanimated = true;

  // MSIE: MicroSoft Internet Explore
  var interval = (window.navigator.userAgent.indexOf('MSIE') !== -1) ? 50 : 10;


  // 运动执行的总次数 = 总时间 / 一次运动花费的时间（每隔多长时间运动一次）
  // 总帧数
  var totalFrames = time / interval;

  // 获取初始状态，并保存在startJSON里
  var startJSON = {};

  // 保存每个属性的变化量
  var deltaJSON = {};

  // 一次遍历，实现初始状态的赋值，结束状态去‘px’ 计算变化量
  for (var k in targetJSON) {
    startJSON[k] = parseFloat(fetchComputedValue(elem, k));
    targetJSON[k] = parseFloat(targetJSON[k]);
    deltaJSON[k] = targetJSON[k] - startJSON[k];
  }


  // 帧编号，记录当前是第几帧（可以理解成运动了几次）
  var frameNumber = 0;

  // 存放每一帧的状态，通过调用Tween类中的动画方法得来的
  var frameState;

  var timer = setInterval(function () {
    // 运动过程： 每一帧都调用Tween类中的动画函数获取，当前真的状态
    for (var n in startJSON) {
      // 当前帧的状态
      frameState = Tween[tweenString](frameNumber, startJSON[n], deltaJSON[n], totalFrames);

      // 把获取到的状态用业务代码实现elem的运动
      if (n !== 'opacity') {
        elem.style[n] = frameState + "px";
      } else {
        elem.style[n] = frameState;
        elem.style.filter = "alpha(opacity=" + (frameState * 100) + ")";
      }
    }
    // 帧编号 + 1
    frameNumber++;
    // 当前帧编号是否等于总帧数，如果是则“拉终停表”
    if (frameNumber === totalFrames) {
      // 拉终： 强行改变到终止状态
      for (var y in targetJSON) {
        if (y !== 'opacity') {
          elem.style[y] = targetJSON[y] + "px";
        } else {
          elem.style[y] = targetJSON[y];
          elem.style.filter = "alpha(opacity=" + (targetJSON[y] * 100) + ")";
        }
      }
      // 停表： 清除定时器
      clearInterval(timer);
      // 停表后，不再运动所以isanimated改成false
      elem.isanimated = false;

      // 执行回调函数，调用的时候传什么就执行什么
      // 调用call方法让回调函数中的this指向elem
      // 因为callback有时会不传，所以需要判断callback情况
      // if(callback){
      //     callback.call(elem);
      // }
      callback && callback.call(elem);
    }

  }, interval);// 执行一次花费的时间
}

/**
 * 获取某一个元素的某个css样式值
 * @param ele 要获取样式的html元素
 * @param styles 要获取的某一个css属性
 * @returns {*} 该元素该属性的值
 */
function fetchComputedValue(ele, styles) {
  if (getComputedStyle) {
    //           backgroundColor -> background-color
    styles = styles.replace(/([A-Z])/g, function (match, $1) {
      return "-" + $1.toLowerCase();
    });
    return getComputedStyle(ele)[styles];
  } else {
    //            background-color -> backgroundColor
    styles = styles.replace(/\-([a-z])/g, function (match, $1) {
      return $1.toUpperCase();
    });
    return ele.currentStyle[styles];
  }
}

// Tween类 缓冲动画
// 第一个参数t表示当前帧编号
// 第二个参数b表示起始位置
// 第三个参数c表示变化量
// 第四个参数d表示总帧数
var Tween = {
  Linear: function (t, b, c, d) {
    return c * t / d + b;
  },
  QuadEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  QuadEaseOut: function (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  QuadEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  },
  CubicEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  CubicEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  CubicEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  QuartEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  QuartEaseOut: function (t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  QuartEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  QuintEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  QuintEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  QuintEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  SineEaseIn: function (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  SineEaseOut: function (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  SineEaseInOut: function (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  ExpoEaseIn: function (t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  ExpoEaseOut: function (t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  ExpoEaseInOut: function (t, b, c, d) {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  CircEaseIn: function (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  CircEaseOut: function (t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  CircEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  ElasticEaseIn: function (t, b, c, d, a, p) {
    if (t === 0) return b; if ((t /= d) === 1) return b + c; if (!p) p = d * .3;
    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  ElasticEaseOut: function (t, b, c, d, a, p) {
    if (t === 0) return b; if ((t /= d) === 1) return b + c; if (!p) p = d * .3;
    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
  },
  ElasticEaseInOut: function (t, b, c, d, a, p) {
    if (t === 0) return b; if ((t /= d / 2) === 2) return b + c; if (!p) p = d * (.3 * 1.5);
    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },
  BackEaseIn: function (t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  BackEaseOut: function (t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  BackEaseInOut: function (t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  },
  BounceEaseIn: function (t, b, c, d) {
    return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
  },
  BounceEaseOut: function (t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  },
  BounceEaseInOut: function (t, b, c, d) {
    if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
    else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }
};

// 获取HTML节点
var oCarousel = document.querySelector('#carousel');

var oMoveUnit = document.querySelector('.section');
var oMU_ul = document.querySelector('.section ul');
var oImgLis = document.querySelectorAll('.section ul li');
var imgLength = oImgLis.length;

var oLeftBtn = document.querySelector('#leftBtn');
var oRightBtn = document.querySelector('#rightBtn');

var oCircles = document.querySelectorAll('.footer ol li');

var lock = false;// 节流控制, lock为true时，锁了，不让点；为false时，开锁了，可以点
var now = 0;// 信号量

// 向图片ul中追加第一张
oMU_ul.appendChild(oImgLis[0].cloneNode(true));

// 类右按钮业务
function leiRight() {
  if (oMoveUnit.isanimated) return;

  now++;
  changeCircle();
  animate(oMoveUnit, { 'left': -singleWidth * now }, animateTime, tweenStyle, function () {
    if (now > imgLength - 1) {
      now = 0;
      this.style.left = 0;
    }
  });
}
// 自动播放
var timer = setInterval(leiRight, interval);
// 鼠标划上时，停止
oCarousel.onmouseover = function () {
  clearInterval(timer);
};
// 鼠标离开时，继续动
oCarousel.onmouseout = function () {
  timer = setInterval(leiRight, interval);
};

// 右按钮业务
oRightBtn.onclick = leiRight;
// 左按钮业务
oLeftBtn.onclick = function () {
  if (oMoveUnit.isanimated) return;

  now--;
  if (now < 0) {
    now = imgLength - 1;
    oMoveUnit.style.left = -singleWidth * imgLength + "px";
  }
  changeCircle();
  animate(oMoveUnit, { 'left': -singleWidth * now }, animateTime, tweenStyle);
};
for (var j = 0; j < imgLength; j++) {
  (function (m) {
    oCircles[m].onclick = function () {// 给小圆点批量添加点击事件
      if (oMoveUnit.isanimated) return;// 判是否在运动
      now = m;// 被点击的当前圆点下标传给信号量，以便马上切换到对应小圆点和对应图片
      changeCircle();
      animate(oMoveUnit, { 'left': -singleWidth * now }, animateTime, tweenStyle);
    };
  })(j);
}

// 小圆点发生变化业务
function changeCircle() {
  var n = now;// 保存信号量，备份
  if (n === imgLength) {// 当 n 取到总个数时，也就是6，让 n = 0
    n = 0;
  }
  // 清除所有小圆点cur类名
  for (var i = 0; i < imgLength; i++) {
    oCircles[i].className = "";
  }
  // 给对应的圆点加 cur 类名
  oCircles[n].className = 'cur';
}