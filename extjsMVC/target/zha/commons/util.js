
/**
 * 一般公共方法
 * xuC
 */


// 打开订单详情界面.. 
function loadOrderDetail( code ){
	if (!code) return ;
	top.Main_Tab.addTab('orderDetailId' , '/view/order/detail?code=' + code , '订单详情' , true);
}

//打开订单详情界面.. 
function loadWaybillDetail( code ){
	if (!code) return ;
	top.Main_Tab.addTab('waybillDetailId' , '/view/waybill/detail?code=' + code , '运单详情' , true);
}


/**
 * 过滤无效参数
 */
function filterParams(params) {
	if (!params) {
		return {};
	}
	
	var obj = {};
	for (var i in params) {
		var data = params[i];
		if (data !== '' && data !== undefined && data !== null ) {
			obj[i] = data;
		}
	}
	return obj;
}

/**
 * 将当前对象名称转换成对象前缀名
 * 例：{id:1}  ->  {'obj.id':1}
 */
function toObjParmar( params , objName) {
	var data = {};
	for (var i in params) {
		data[objName + '.' + i ] = params[i];
	}
	return data;
}

/**
 * 提示窗口
 * @param opt
 */
function showMsgBox(opt){
	if (top.mainframe.layerTip) {
		top.mainframe.layerTip.show(opt);
	}
}

/**
 * 缓存数据
 * @param opt
 */
function getCacheData(id , isClone){
	var cacheObj = top.CacheManager;
	return isClone ? cacheObj.getColneData(id) : cacheObj.getData(id)
}

/**
 * 获取基础数据字段值
 */
function getBaseDataText(code , type) {
	if (code !== null && code !== undefined && code !== '' && type) {
		var data = getCacheData(type).getById(code);
		return data ? data.raw.text : '';
	}
	return '';
}

/**
 * 通过分钟数获取天数， 以0.5天作为一单位，不够补满
 */
function getDayByMin(min) {
	var totalTime = parseInt(min/60 || 0);
	totalTime = totalTime % 12 != 0 ? parseInt(totalTime/12) + 1 : parseInt(totalTime/12);
	return totalTime * 0.5;
}

/**
 * 通过时间格式，获取日期格式
 */
function getDayByTime(time) {
	if (time && time.length > 10) {
		return time.substring(0 , 10);
	} else if (time && time.length == 10) {
		return time;
	}
	return '';
}

/**
 * 格式化金钱数值， 转为100,100
 */
function toThousands(num) {
	if (num === null || num === undefined || num === '') {
		return '';
	};
	if (parseInt(num) == 0) {
		return parseFloat('0.00').toFixed(2);
	} 
	num = num + '';
	if (num.indexOf('.') == -1) {
		return parseFloat(num + '.00').toFixed(2);
	} else {
		if(num.substring(num.lastIndexOf('.') , num.length).length == 1) {
			return parseFloat(num + '0').toFixed(2);
		}
		return parseFloat(num).toFixed(2);
	}
	/*num = num.toString().replace(/\$|\,/g,'');  
	if(isNaN(num)) num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    	num = num.substring(0,num.length-(4*i+3)) + ','+  num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
    return  (((sign)?'':'-') + num);*/
}

/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天
*/
function getDateDiff(startTime, endTime, diffType) {
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    var divNum = 1;
    switch (diffType) {
        case "s":
            divNum = 1000;
            break;
        case "m":
            divNum = 1000 * 60;
            break;
        case "h":
            divNum = 1000 * 3600;
            break;
        case "d":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

/**
 * 获取按钮图标
 */
function getIcon(type) {
	type = type || 'query';
	return global.imagePath + '/btn/' + type + '.png';
}

/**
 * 获取工具栏图标
 */
function getToolIcon(type) {
	type = type || 'query';
	return global.imagePath + '/tool/' + type + '.png';
}

/**
 * 获取tree图标
 */
function getTreeIcon(type) {
	type = type || 'folder';
	return global.imagePath + '/treeIcon/' + type + '.png';
}

function getContainerSize(type) {
	if (type.indexOf('20') != -1) {
		return 20;
	}
	return 40;
}

function getUploadImgPath( imgPath ) {
	if (!imgPath) {
		return '';
	}
	return uploadPath + imgPath;
}

/**
 * 将ID下的所有Region设置为readOnly样式
 * params：{
 * 	id:所属父级ID
 * 	true/ false
 * }
 */
function setReadOnlyByRegionList(id , readOnly) {
	var color = readOnly ? '#eee' : '#fff';
	$('#' + id).find('.city-picker').find('.city-picker-span').css('background-color' , color );
}

/**
 * 初始化日期控件
 */
function buildQueryDate(){
	var option = {
		format:'Y-m-d',
		timepicker:false
	};
	$('.datepicker').datetimepicker(option);
	option.timepicker = true;
	option.format='Y-m-d H:i';
	option.step = 10;
 	$('.datetimepicker').datetimepicker(option);
}
