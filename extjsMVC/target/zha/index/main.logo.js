var Main_logoCom = Main_logoCom || {};

Main_logoCom.build = function(loginUserJsonStr) {

	var loginUser = Ext.JSON.decode(loginUserJsonStr || '{}');//将字符串解析成json对象
	//var loginUser = loginUserJsonStr;

	Main_logoCom.loginUser = loginUser;
	
	return {
		region : 'north',
		height : '10%',
		minHeight : 60,
		html : '<div class="logobar"><div class="logo">后台台管理系统</div>' +
				'<div class="btn">' +
					'<div class="logo welcomeLogo"></div><a href="javascript:void(0)">欢迎 ' + loginUser.loginName + '</a>' +
					'<div class="logo editpassword"></div><a href="javascript:void(0)" onclick="Main_logoCom.editPassword()" class="easyui-linkbutton" plain="true" icon="icon-edit">修改密码</a>' +
					'<div class="logo exit"></div><a href="javascript:void(0)" onclick="Main_logoCom.logout()" class="easyui-linkbutton" plain="true" icon="icon-clear">安全退出</a>' +
				'</div>' +
			'</div>'
	};
}

/**
 * 登出系统
 */
/*Main_logoCom.logout = function() {
	
	showMsgBox({type:'confirm' , text:'确定要退出？' , confirm: function (){
		/!*Ajax.request({
			url : basePath + '/logout',
			success : function(response) {*!/
				window.location.href = basePath + '/login.jsp';
			/!*}
		});*!/
	} , cancel: function (){
		return ;
	}});
}*/

/**
 * 修改密码
 */
/*Main_logoCom.editPassword = function() {
	var win = Ext.create('Ext.window.Window', {
	    title: '修改密码',
	    height: 200,
		autoScroll:true,
		resizable : false, // 改变大小   
		frame:true,
	    modal:true,
	    width: 400,
	    layout: 'fit',
	    items: {  		// Let's put an empty grid in just to illustrate fit layout
	        xtype: 'form',
	        id:'searchForm',
			layout : 'column',
			width: '100%',
			border : false,
			defaultType : 'textfield',
			bodyStyle : 'padding:10px;',
			items : [
				{
					id:'Main_logoCom_original_password',
					fieldLabel : '原密码',
					columnWidth: .9,
					inputType: 'password' ,
					labelStyle : "text-align:center;",
					style : {
						
					},
				}, {
					id:'Main_logoCom_update_password',
					fieldLabel : '修改密码',
					columnWidth: .9,
					inputType: 'password' ,
					labelStyle : "text-align:center;",
					style : {
						marginTop : '10px'
					},
				}, {
					id:'Main_logoCom_confirm_password',
					fieldLabel : '确认密码',
					columnWidth: .9,
					inputType: 'password' ,
					labelStyle : "text-align:center;",
					style : {
						marginTop : '10px'
					},
				}
			],
			buttons:[
			         { text: '保存' , handler : function (){
			        	 if (Ext.getCmp('Main_logoCom_confirm_password').getValue() != Ext.getCmp('Main_logoCom_update_password').getValue()) {
			        		top.showMsgBox('修改密码错误', '输入的密码不一致');
			        		return ; 
			        	 }
			        	 
			        	 Ajax.request({
			        		 url: basePath + '/user/update_password',
			        		 params:{
			        			 password:hex_md5(hex_md5(Ext.getCmp('Main_logoCom_confirm_password').getValue())),
			        			 oldPassword:hex_md5(hex_md5(Ext.getCmp('Main_logoCom_original_password').getValue()))
			        		 },
			        		 execute: function (result, success) {
			        			if (success) {
			        				win.close();
			        			}
			        		 }
			        	 })
			         }} ,
			         { text: '取消' , handler : function (){
			        	 win.close();
			         } }
	        ]
    	}
	}).show();
}*/
