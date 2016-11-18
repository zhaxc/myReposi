
/**
 * tip 提示框
 */
var Main_Tip = Main_Tip || {
	//tipEl:{},
	//tipTemplate:  new Ext.Template('<div id="mainTipBar" class="mainTipBar"><img alt="" src="{imagePath}{type}-bar.png" width="100%" height="100%">' +
	//	'<div class="conter"><div class="logo" style="background-image: url(\'{imagePath}{type}-logo.png\');"></div><div class="textarea"><div class="title">{title}</div>' +
	//	'<div class="text">{text}</div></div></div><div class="closeBtn" style="background-image: url(\'{imagePath}{type}-close.png\');" onclick="Main_Tip.close()"></div></div>'),
	//defaultOpt:{
	//	imagePath:imagePath + '/index/tip/',
	//	title:'提示',
	//	text:'',
	//	type:'error',
	//	timer:3000,
	//	isClose:false
	//},
	//showing:false
};

Main_Tip.build = function (){
	////$('#indexBody').append(Main_Tip.tipTemplate.apply(this.defaultOpt));
	//return Main_Tip;
}

/**
 * 提示框显示
 * param {
 * 	title -- 标题,
 *  text -- text,
 *  status (error , success , warm ) -- 状态 ,
 *  callback,	--回调 , 关闭时执行
 *  hideTimer	--自定义消失时间单位ms
 * 	}
 */
Main_Tip.show = function(opt) {
	//if (!opt.text ) {
	//	return ;
	//}
	//clearTimeout( Main_Tip.timer || {} );
	//
	//var newOpt = Ext.clone(this.defaultOpt);
	//if (opt.type == 'e') {
	//	opt.type = 'error'
	//}
	//if (opt.type == 'w') {
	//	opt.type = 'warm'
	//}
	//if (opt.type == 's') {
	//	opt.type = 'success'
	//}
	//
	//newOpt = Ext.apply(newOpt , opt);
	//$('#mainTipBar').remove()
	//$('#indexBody').append(Main_Tip.tipTemplate.apply(newOpt));
	//
	//Main_Tip.setClose(newOpt.timer , newOpt.callback);
}

Main_Tip.setClose = function (timer , callback){
	//Main_Tip.timer = setTimeout (function (){
	//	Main_Tip.close();
	//	if (callback) {
	//		callback();
	//	}
	//} , timer);
}

Main_Tip.close = function() {
	//$('#mainTipBar').fadeTo('slow' , 0.25, function (){
	//	Main_Tip.showing = false;
	//	$('#mainTipBar').remove();
	//});
}

