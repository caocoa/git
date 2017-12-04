(function() {
	var oCarousel = document.querySelector("#carousel");
	var oMoveUnit = document.querySelector("section");
	var oMU_Ul = document.querySelector("section ul");
	var oImgli = document.querySelectorAll("section ul li");
	var imgLength = oImgli.length;

	var oLeftBtn = document.querySelector("#leftBtn");
	var oRightBtn = document.querySelector("#rightBtn");

	var oCircles = document.querySelectorAll("footer ol li");

	var singelwidth = 720;
	var animateTime = 600;
	var teenStyle = 'BackEaseInOut';
	var interval = 2400;
	var lock = false;
	var now = 0;

	oMU_Ul.appendChild(oImgli[0].cloneNode(true));

	function leiRight() {
		if(oMoveUnit.isanimated) return;
		now++;
		changeCircle();
		animate(oMoveUnit, {
			'left': -singelwidth * now
		}, animateTime, teenStyle, function() {
			if(now > imgLength - 1) {
				now = 0;
				this.style.left = 0;
			}
		});
	}

	oRightBtn.onclick = leiRight;

	oLeftBtn.onclick = function() {
		if(oMoveUnit.isanimated) return;
		now--;
		if(now < 0) {
			now = imgLength - 1;
			oMoveUnit.style.left = -singelwidth * imgLength + 'px';
		}
		changeCircle();
		animate(oMoveUnit, {'left': -singelwidth * now}, animateTime, teenStyle, 
		);
	};

	for(j = 0; j < imgLength; j++) {
		(function(m) {
			oCircles[m].onclick = function() {
				if(oMoveUnit.isanimated) return;
				now = m;
				changeCircle();
				animate(oMoveUnit, {
					'left': -singelwidth * now
				}, animateTime, teenStyle);
			};
		})(j);
	}

	var timer = setInterval(leiRight, interval);
	oCarousel.onmouseover = function() {
		clearInterval(timer);
	};
	oCarousel.onmouseout = function() {
		timer = setInterval(leiRight, interval);
	};

	function changeCircle() {
		var n = now;
		if(n === imgLength) {
			n = 0;
		}
		for(var i = 0; i < imgLength; i++) {
			oCircles[i].className = "";
		}
		oCircles[n].className = "cur";
	};

})();