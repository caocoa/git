(function () {
    // 获取HTML节点
    var oCarousel = document.querySelector('#carousel');

    var oMoveUnit = document.querySelector('section');// 滚动轮播是section在动
    var oMU_ul = document.querySelector('section ul');
    var oImgLis = document.querySelectorAll('section ul li');// 三位置轮播是li在动
    var imgLength = oImgLis.length;

    var oLeftBtn = document.querySelector('#leftBtn');
    var oRightBtn = document.querySelector('#rightBtn');

    var oCircles = document.querySelectorAll('footer ol li');

    // 定义一些常用量
    var singleWidth = 720;// 一张图宽度
    var animateTime = 600;// 动画过程时间
    var tweenStyle = 'Linear';// 缓冲动画样式
    var interval = 2600;// 每隔interval切换一次图片
    var lock = false;// 节流控制, lock为true时，锁了，不让点；为false时，开锁了，可以点
    var now = 0;// 信号量



    // 类右按钮业务
    function leiRight(){
        if(oImgLis[now].isanimated)return;// 节流

        animate(oImgLis[now],{'left':-singleWidth},animateTime,tweenStyle);
        now++;
        if(now > imgLength - 1){
            now = 0;
        }
        oImgLis[now].style.left = (singleWidth - 30) + "px";// 让将要显示的图片在可见区域右边准备好
        animate(oImgLis[now],{'left':0},animateTime,tweenStyle);// left是0，表示在可见区域显示
        changeCircle();
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

        animate(oImgLis[now],{'left':singleWidth},animateTime,tweenStyle);
        now--;
        if(now < 0){
            now = imgLength - 1;
        }
        oImgLis[now].style.left = (-singleWidth + 30) + "px";
        animate(oImgLis[now],{'left':0},animateTime,tweenStyle);
        changeCircle();
    };

    for(var j = 0;j < imgLength;j++){
        (function (m) {
            oCircles[m].onclick = function () {// 给小圆点批量添加点击事件
                if(oImgLis[now].isanimated)return;// 判是否在运动

                if(m > now){
                    animate(oImgLis[now],{'left':-singleWidth},animateTime,tweenStyle);
                    now = m;
                    oImgLis[now].style.left = (singleWidth - 30) + 'px';
                    animate(oImgLis[now],{'left':0},animateTime,tweenStyle);
                }else if(m < now){
                    animate(oImgLis[now],{'left':singleWidth},animateTime,tweenStyle);
                    now = m;
                    oImgLis[now].style.left = (-singleWidth + 30) + 'px';
                    animate(oImgLis[now],{'left':0},animateTime,tweenStyle);
                }else{
                    alert("显示的就是这张，还点屁啊！");
                }
                changeCircle();
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