(function() {
	var oCarousel = document.querySelector('#carousel');
	var oMoveUnit = document.querySelector('section');
	var oMU_ul = document.querySelector('section ul');
	var oImgLis = document.querySelectorAll('section ul li');
	var oSmallImg = document.querySelectorAll('footer ol li');
	var imgLength = oImgLis.length;

	var singleHeight = 230;
	var animateTime = 600;
	var tweenStyle = 'Linear';
	var interval = 2400;
	var now = 0;

	oMU_ul.appendChild(oImgLis[0].cloneNode(true));

	function bannerMove() {
		if(oMoveUnit.isanimated) return;
		now++;
        changeSmallImg();
		animate(oMoveUnit, {'top': -singleHeight * now}, animateTime, tweenStyle, function() {
			if(now > imgLength - 1) {
				now = 0;
				this.style.height = 0;
			}
		});
	}
	var timer = setInterval(bannerMove,interval);
	 oCarousel.onmouseover = function () {
        clearInterval(timer);
    };

    oCarousel.onmouseout = function () {
        timer = setInterval(bannerMove,interval);
    };
    for(var j = 0;j < imgLength;j++){
        (function (m) {
            oSmallImg[m].onclick = function () {
                if(oMoveUnit.isanimated)return;
                now = m;
                changeSmallImg();
                animate(oMoveUnit,{'top':-singleHeight * now},animateTime,tweenStyle);
            };
        })(j);
    }

    function changeSmallImg(){
        var n = now;
        if(n === imgLength){
            n = 0;
        }
        for(var i = 0;i < imgLength;i++){
            oSmallImg[i].className = "";
        }
        oSmallImg[n].className = 'now';
    }


})();