/* Version 0.1*/
/* Version 1.0   添加透明度改变*/
/* Version 1.1   把回调函数中的this指向elem*/

/**
 * 包含运动和透明度改变的函数
 * @param elem 要运动的html元素
 * @param targetJSON {JSON} 运动终止时的属性值
 * @param time 单位是毫秒，运动经历的总时间
 * @param callback 回调函数，运动结束后执行的函数
 */
function animate(elem, targetJSON, time, callback) {
	// MSIE: MicroSoft Internet Explore
	throw new Error("");
	var interval = (window.navigator.userAgent.indexOf('MSIE') !== -1) ? 50 : 10;

	// 获取初始状态，并保存在startJSON里
	var startJSON = {}; // {"top" : 100,"left" : 100}
	for(var k in targetJSON) {
		startJSON[k] = parseFloat(fetchComputedValue(elem, k));
	}

	// 运动执行的总次数 = 总时间 / 一次运动花费的时间（每隔多长时间运动一次）
	var totalTimes = time / interval;

	// 计算并保存每个属性变化的步长在stepJSON里
	var stepJSON = {};
	for(var m in targetJSON) {
		stepJSON[m] = (parseFloat(targetJSON[m]) - startJSON[m]) / totalTimes;
	}

	// 计数器，用于记录实际运动的次数
	var count = 0;

	var timer = setInterval(function() {
		// 运动过程： 在初始状态上每次加步长
		for(var n in startJSON) {
			startJSON[n] += stepJSON[n];
			if(n !== 'opacity') {
				elem.style[n] = startJSON[n] + "px";
			} else {
				elem.style[n] = startJSON[n];
				elem.style.filter = "alpha(opacity=" + (startJSON[n] * 100) + ")";
			}
		}
		// 运动一次，计数器加 1
		count++;
		// 判断实际运动的次数是否等于应该运动的总次数，如果是则“拉终停表”
		if(count === totalTimes) {
			// 拉终： 强行改变到终止状态
			for(var y in targetJSON) {
				if(y !== 'opacity') {
					elem.style[y] = targetJSON[y] + "px";
				} else {
					elem.style[y] = targetJSON[y];
					elem.style.filter = "alpha(opacity=" + (targetJSON[y] * 100) + ")";
				}
			}
			// 停表： 清除定时器
			clearInterval(timer);
			// 执行回调函数，调用的时候传什么就执行什么
			// 调用call方法让回调函数中的this指向elem
			callback.call(elem);
		}
	}, interval); // 执行一次花费的时间
}

/**
 * 获取某一个元素的某个css样式值
 * @param ele 要获取样式的html元素
 * @param styles 要获取的某一个css属性
 * @returns {*} 该元素该属性的值
 */
function fetchComputedValue(ele, styles) {
	if(getComputedStyle) {
		//           backgroundColor -> background-color
		styles = styles.replace(/([A-Z])/g, function(match, $1) {
			return "-" + $1.toLowerCase();
		});
		return getComputedStyle(ele)[styles];
	} else {
		//            background-color -> backgroundColor
		styles = styles.replace(/\-([a-z])/g, function(match, $1) {
			return $1.toUpperCase();
		});
		return ele.currentStyle[styles];
	}
}
var Tween = {
	Linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	Quad: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOut: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOut: function(t, b, c, d) {
			if((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOut: function(t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOut: function(t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t, b, c, d) {
			return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOut: function(t, b, c, d) {
			return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if(t == 0) return b;
			if(t == d) return b + c;
			if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOut: function(t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOut: function(t, b, c, d) {
			if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t, b, c, d, a, p) {
			if(t == 0) return b;
			if((t /= d) == 1) return b + c;
			if(!p) p = d * .3;
			if(!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOut: function(t, b, c, d, a, p) {
			if(t == 0) return b;
			if((t /= d) == 1) return b + c;
			if(!p) p = d * .3;
			if(!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		},
		easeInOut: function(t, b, c, d, a, p) {
			if(t == 0) return b;
			if((t /= d / 2) == 2) return b + c;
			if(!p) p = d * (.3 * 1.5);
			if(!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		}
	},
	Back: {
		easeIn: function(t, b, c, d, s) {
			if(s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOut: function(t, b, c, d, s) {
			if(s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOut: function(t, b, c, d, s) {
			if(s == undefined) s = 1.70158;
			if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t, b, c, d) {
			return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
		},
		easeOut: function(t, b, c, d) {
			if((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if(t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if(t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOut: function(t, b, c, d) {
			if(t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	}
};

function T$(i) {
	return document.getElementById(i);
}

function T$$(i) {
	return document.getElementsByName(i);
}

function Each(arr, fn) {
	for(var i = 0, len = arr.length; i < len; i++) {
		fn(arr[i], i, arr);
	}
}
Tween.demo = function() {
	var change = 500,
		duration = 100,
		timer = null;
	var rTween = 'Linear',
		rEase = 'easeIn';
	var ss = T$('scroller'),
		sl = T$('line'),
		sc = T$('chart'),
		rTweens = T$$('rTween'),
		rEases = T$$('rEase');;
	return {
		init: function() {
			this.setMethod();
			this.drawChart();
			this.events();
		},

		events: function() {
			var self = this;
			Each(rTweens, function(item) {
				item.onclick = function() {
					rTween = this.value;
					self.setMethod();
					self.drawChart();
				}
			});
			Each(rEases, function(item) {
				item.onclick = function() {
					rEase = this.value;
					self.setMethod();
					self.drawChart();
				}
			});

			T$('run').onclick = function() {
				self.scroller();
				self.drawChart();
			}
		},

		setMethod: function() {
			fx = rTween == 'Linear' ? Tween[rTween] : Tween[rTween][rEase];
		},

		scroller: function() {
			clearTimeout(timer);
			var time = 0,
				begin = 0;
			sl.style.display = 'block';

			function run() {
				ss.style.left = Math.ceil(fx(time, begin, change - 50, duration)) + 'px';
				sl.style.left = Math.ceil(Tween.Linear(time, begin, change, duration)) + 'px';
				if(time < duration) {
					time++;
					timer = setTimeout(run, 10);
				} else {
					time = duration;
					sl.style.display = 'none';
					clearTimeout(timer);
				}
			}
			run();
		},

		drawChart: function() {
			var arr = [];
			for(var i = 0; i <= change; i++) {
				arr.push('<div style="width:2px;height:2px;font-size:0;background-color:#006600;position:absolute;left:' + (i - 1) + 'px;top:' + (Math.ceil(fx(i, 200, -200, change))) + 'px"><\/div>');
			}
			sc.innerHTML = arr.join('');
		}
	}
}();