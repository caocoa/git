function(elem,targetJSON,time,tweenString,callback){
	if(arguments.length<3||
	typeof arguments[0] !== "object"||
	typeof arguments[1] !== "object"||
	typeof arguments[2] !== "number"||){
		throw new Error("对不起输入有误");
	}elseif(arguments.length == 3){
		tweenString="Linear";
		callback=null;
	}elseif(argunments.length == 4){
		if(typeof arguments[3]=="String"){
			callback=null;
			break;
		}elseif(typeof arguments[3]=="function"){
			tweenString = 'Linear';
            break;
		}else{
			throw new Error("输入有误");
			break;
		}
	}
	
}
