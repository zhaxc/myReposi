var Main_Menu = Main_Menu || {};

Main_Menu.build = function (menuJsonStr){
	
	var menus = Ext.JSON.decode(menuJsonStr || '{}');
	
	var arr = [];
	for (var i in menus) {
		console.log(menus[i])
		var tree = Ext.create('Ext.tree.TreePanel',{
			border:false,
			root:menus[i],
			//root:{
			//	text: 'Root',
			//	expanded: true,
			//	children: [
			//		{
			//			text: '节点1',
			//			leaf: true
			//		},
			//		{
			//			text: '节点2',
			//			leaf: true
			//		},
			//		{
			//			text: '节点3',
			//			expanded: true,//是否展开
			//			children: [
			//				{
			//					text: '孙子节点',
			//					leaf: true
			//				}
			//			]
			//		}
			//	]
			//},
		  	store:new Ext.data.TreeStore({

		  	}),
		  	rootVisible:false,
		  	listeners:{
		  		'itemclick' :function (tree,  item) {
					//Ext.Msg.alert("aaa",item.data.id);
					//console.log(tree);
					//console.log(item);
		  			Main_Tab.addTab(item.data.id , item.data.attributes , item.data.text);
		  		}
			}
		});
		/*arr[arr.length] =  { title: menus[i].text , layout:'fit', items:[tree], icon: imagePath + "/index/menu/" + menus[i].id + '.png' };*/
		arr[arr.length] =  { title: menus[i].text , layout:'fit', items:[tree]};
	}
	
	Main_Menu.orderMeuns = [];

	for (var i in menus) {
		if (!menus[i].children){continue};

		for (var j in menus[i].children) {
			var data = menus[i].children[j];

			if (!data.attributes) {continue};
//			if (data.attributes.indexOf('/orderPayment') != -1 || data.attributes.indexOf('/orderTruth') != -1 ||
//					data.attributes.indexOf('/orderTtransport') != -1 || data.attributes.indexOf('/point') != -1 || data.attributes.indexOf('/orderRisk') != -1) {
			Main_Menu.orderMeuns[data.id] = {
				id:data.id ,
				attributes:data.attributes,
				text:data.text
			}
//			}
		}
	}
	
	var panel = Ext.create('Ext.panel.Panel', {
		region: 'west',
	    layout:'accordion',
	    split: true,
	    border:false,
	    title:'',
        collapsible: true,
        minWidth: 150,
	    width: '15%',
        items: arr
	});
	return panel;
}


/**
 * 主页直接打开订单界面
 */
Main_Menu.mainOpenMenu = function (key) {
	//for (var i in Main_Menu.orderMeuns) {
	//	var data = Main_Menu.orderMeuns [i];
	//	if (data.attributes.substring(data.attributes.lastIndexOf('/') + 1 , data.attributes.length) == key) {
	//		Main_Tab.addTab(data.id , data.attributes , data.text);
	//		return ;
	//	}
	//}
}
