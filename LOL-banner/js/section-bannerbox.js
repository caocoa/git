var bannerlist = document.querySelector(".bannerimg");
//找到bannernav的五个子元素
var bannernav = document.getElementsByClassName("bannernav")[0] .children;
//在控制台输出
console.log(bannernav);

var i=0;//声明一个标记
//创建一个定时器
var timer = setInterval(move,3000);
//轮播图
function move(){
	i++;
	if(i==5){
		i=0;
	}
	//bannerlist时序左移
	bannerlist.style.marginLeft = -i*820+"px";
	for(var x = 0;x<bannernav.length;x++){
		bannernav[x].children[0].className = "";
	}
	bannernav[i].children[0].className = "now";
}


for(var y = 0;y<bannernav.length;y++){
	bannernav[y].index = y;
	bannernav[y].onmousemove =function(){
		//清除定时器
		clearInterval(timer);
		i=this.index
		//设置鼠标移动
		bannerlist.style.marginLeft = -i*820+"px";
		for(var z = 0;z<bannernav.length;z++){
			bannernav[z].children[0].className = "";
		}
		this.children[0].className = "now";
	}
	bannernav[y].onmouseout = function(){
		timer = setInterval(move,3000);
	}
  
}