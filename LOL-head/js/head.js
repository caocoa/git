//通过类名或标签名，；来获取导航部分和隐藏部分
var onav=document.querySelector(".nav");
var olayer=document.querySelector(".layer");
//鼠标移入nav，layer显示
onav.onmouseover = function(){
	olayer.style.display = "block";
	//layer显示时，鼠标移入layer，layer显示
	olayer.onmouseover = function(){
		olayer.style.display = "block";
	}
	//鼠标移出layer时，layer隐藏
	olayer.onmouseout = function(){
		olayer.style.display="none"
	}	
}
//鼠标移出nav，layer消失
onav.onmouseout = function(){
	olayer.style.display = "none"
}
