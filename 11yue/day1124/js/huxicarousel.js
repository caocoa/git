(function () {
    // 获取HTML节点
    var oCarousel = document.querySelector('#carousel');

    var oImgLis = document.querySelectorAll('section ul li');// 三位置轮播是li在动
    var imgLength = oImgLis.length;

    var oLeftBtn = document.querySelector('#leftBtn');
    var oRightBtn = document.querySelector('#rightBtn');

    var oCircles = document.querySelectorAll('footer ol li');

    // 定义一些常用量
    var animateTime = 300;// 动画过程时间
    var tweenStyle = 'Linear';// 缓冲动画样式
    var interval = 1300;// 每隔interval切换一次图片
    var now = 0;// 信号量



    // 类右按钮业务
    function leiRight(){
        if(oImgLis[now].isanimated)return;// 节流

        // 老图淡出
        animate(oImgLis[now],{'opacity':0},animateTime,tweenStyle,function () {
            this.style.display = "none";
            now++;
            if(now > imgLength - 1){
                now = 0;
            }
            oImgLis[now].style.display = "block";
            animate(oImgLis[now],{'opacity':1},animateTime,tweenStyle);
            changeCircle();
        });
    }
    // 自动播放
    var timer = setInterval(leiRight,interval);
    // 鼠标划上时，停止
    oCarousel.onmouseover = function () {
        clearInterval(timer);
    };
    // 鼠标离开时，继续动
    oCarousel.onmouseout = function () {
        timer = setInterval(leiRight,interval);
    };

    // 右按钮业务
    oRightBtn.onclick = leiRight;
    // 左按钮业务
    oLeftBtn.onclick = function () {
        if(oImgLis[now].isanimated)return;

        animate(oImgLis[now],{'opacity':0},animateTime,tweenStyle,function () {
            this.style.display = "none";
            now--;
            if(now < 0){
                now = imgLength - 1;
            }
            oImgLis[now].style.display = "block";
            animate(oImgLis[now],{'opacity':1},animateTime,tweenStyle);
            changeCircle();
        });
    };

    for(var j = 0;j < imgLength;j++){
        (function (m) {
            oCircles[m].onclick = function () {// 给小圆点批量添加点击事件
                if(oImgLis[now].isanimated)return;// 判是否在运动

                animate(oImgLis[now],{'opacity':0},animateTime,tweenStyle,function () {
                    this.style.display = "none";
                    now = m;
                    oImgLis[now].style.display = "block";
                    animate(oImgLis[now],{'opacity':1},animateTime,tweenStyle);
                    changeCircle();
                });
            };
        })(j);
    }

    // 小圆点发生变化业务
    function changeCircle(){
        var n = now;// 保存信号量，备份
        if(n === imgLength){// 当 n 取到总个数时，也就是6，让 n = 0
            n = 0;
        }
        // 清除所有小圆点cur类名
        for(var i = 0;i < imgLength;i++){
            oCircles[i].className = "";
        }
        // 给对应的圆点加 cur 类名
        oCircles[n].className = 'cur';
    }
})();