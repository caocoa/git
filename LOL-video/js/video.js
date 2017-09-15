var oaltsp=document.querySelector(".alt-sp");
var oaltmp4=document.getElementById("alt_MP4");

oaltsp.onclick = function(){
	oaltmp4.style.display = "block";
}
oaltmp4.children[0].children[1].onclick = function(){
	oaltmp4.style.display = "none";
}
