var Main_Tab = Main_Tab || {};

Main_Tab.build = function (){
	var panel = new Ext.Panel({
		id : 'map',
		title : '主页',
		layout : 'fit',
		border : false,
		closable : false,
		//html:"<iframe id='main' src='" + basePath + "/view/main' width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>"
		html:'body'
	});

	var tabPanel = new Ext.tab.Panel({
		region: 'center',
		width:'100%',
		height:'100%',
		border : false,
		closable : false
	});

	tabPanel.add(panel);
	tabPanel.setActiveTab(panel);

	this.tab = tabPanel;
	return tabPanel;
}

Main_Tab.addTab = function (id, link, name , isReload) {
	//console.log(id, link, name, isReload);
	var tabId = "tab-" + id;
	var frameId = 'frame-' + id;
	var tabTitle = name;
	var tabLink = basePath + link + '.jsp';
	var centerpanel = this.tab;

	//console.log(tabId, frameId, tabTitle, tabLink, centerpanel);
	var tab = Ext.getCmp(tabId);//得到tab组件

	var subMainId = 'tab-' + id + '-main';

	if (tab && isReload) {
		this.tab.remove(tab);
		tab = null;
	}

	//Ext.Ajax.request({
	//	url: basePath + '/view/valid',
	//	hide:true,
	//	execute: function (result , success) {
	//		if (success) {

				// 打开页面之前判断
				if (!tab) {
					tab = new Ext.Panel({
						id : tabId,
						title : ' ' + tabTitle,
						layout : 'fit',
						border : false,
						closable : true,
						html:"<iframe id='" + frameId + "' src=" + tabLink + " name=" + tabTitle + " width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>",
						listeners:{
							'destroy' : function (){

							}
						}
					});
					centerpanel.add(tab);
					centerpanel.setActiveTab(tab);
				} else {
					centerpanel.setActiveTab(tab);
				}

	//		} else {
    //
	//		}
	//	}
	//})

}
