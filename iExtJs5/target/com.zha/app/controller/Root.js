/*
 * Global Controller 控制器：通过组件查询类(Ext.ComponentQuery)来查询视图组件，并为它绑定事件，执行相关操作
 */

Ext.define("App.controller.Root", {
	extend: "Ext.app.Controller",

	requires: [],//相当于import 引用其他类
	
	onLaunch: function() {}
});