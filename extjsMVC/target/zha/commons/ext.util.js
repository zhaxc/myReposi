/**
 * 页面参数
 */

function get(id) {
	var pageParam = pageParam || {};
	if (pageParam && pageParam.pId) {
		return Ext.getCmp( pageParam.pId + id);
	}
	return Ext.getCmp(id);//根据组件id获取组件
}

/**
 * 查询界面面板
 * @param opt		通用配置
 * @returns 查询面板
 */
function getPanel(opt) {
	var defaultOpt = {
		frame:true,
		autoScroll:true,
		items : []
	};
	return new Ext.panel.Panel(Ext.apply(defaultOpt , opt));
}

/**
 * 获取表单面板
 * @param opt 通用配置
 */
function getForm(opt) {
	var defaultOpt = {
		frame:true,
		autoScroll:true,
		layout : 'column',
		defaultType : 'textfield',
		bodyStyle : 'padding:10px;'		//backgroundColor:#D6E3F2
	};
	return new Ext.form.Panel(Ext.apply(defaultOpt , opt));
}

/**
 * 获取查询表格
 * @param opt
 * @returns
 */
function getGrid(opt) {
	var store = new Ext.data.Store({ });
	var defaultOpt = {
		frame:true,
		autoScroll:true,
		//bodyStyle : 'backgroundColor:#eee',
		multiSelect: false, //支持多选
		sortableColumns: false,
		enableColumnHide:false,
		store: opt.store || store,
		bbar: new Ext.PagingToolbar({
        	pageSize:30,
            store: opt.store || store,//数据
            displayInfo: true,
            displayMsg: '从{0}条到{1}条  总共 {2}条',
            emptyMsg: "没有数据"
        })
	};
	return new Ext.grid.Panel(Ext.apply(defaultOpt , opt));
}

/**
 * 获取tree
 * @param opt
 * @returns
 */
function getTree(opt) {
	var store = new Ext.data.TreeStore({
		root:{
			text:'根目录',
			leaf:true,
			id:-1
		}
	});
	var defaultOpt = {
		frame:true,
		store: opt.store || store,
	};
	return new Ext.tree.Panel(Ext.apply(defaultOpt , opt));
}

/**
 * 
 * 根据文本信息， 对tree进行过滤
 * 
 * params:
 * 	1. tree 对象
 * 	2. 搜索文本
 * 	3. 过滤字段	默认为text
 * 	arr[
 * 		{searchText: , filterField: }
 * 		{searchText: , filterField: }
 * 	]
 * 
 */
function filterTree(tree , arr) {
	
	tree.getStore().clearFilter();		// 清除上一次过滤
	
	var parentIds = ',';
	
	var getParentIds = function ( node ){
		parentIds += node.internalId + ',';
		if (node.parentNode && node.parentNode.data.id != -1) {
			getParentIds( node.parentNode );
		}
		
	}
	
	tree.getStore().filterBy(function (record){
		var valid = true;
		for (var i in arr) {
			if (!record.data[arr[i].filterField]) {
				valid = false;
			}
			if (arr[i].searchText && record.data[arr[i].filterField] && valid) {
				valid = (record.data[arr[i].filterField] + '').indexOf(arr[i].searchText) == -1 ?  false : true;
			}
		}
		
		if (valid || parentIds.indexOf(',' + record.internalId + ',') != -1) {
			if (record.parentNode.data.id != -1) {		// 递归上级id
				getParentIds(record.parentNode)
			}
			return true;
		}
	})
	
}


/**
 * 通过grid的记录将数据加载到form表单中
 * @param id  recordId
 * @param gid gridId
 * @param fid formId
 */
function loadRecordByGrid(id , gid , fid) {
	if (!id || !gid || !fid ){
		return ;
	}
	var record = {};
	if (typeof gid == "string") {
		record = get(gid).getStore().findById(id);
	} else {
		record = gid.getStore().getById(id);
	}
	if (typeof fid == "string") {
		get(fid).loadRecord(record);
	} else {
		fid.loadRecord(record);
	}
	if (record) {
		return true;
	}
	return false;
}

/**
 * 获取表单组
 *  @param opt 通用配置
 */
function getColumn(opt) {
	var defaultOpt = {
		margin:0,
		border:false,
		xtype:'panel',
		layout:'column'
	}
	return Ext.apply(defaultOpt , opt);
}

/**
 * 获取分类表单组
 * @param opt 表单设置
 * @param oopt 表单组设置
 */
function getGroupColumn(opt , oopt) {
	opt = opt || {};
	
	if (opt.title) {
		var items = [];
		items[0] = {
			height:17,
			border:false,
			html:'<fieldset style="border:1px solid #cecece; border-bottom:0px;margin:0px; color: #000;font-weight: bold; "><legend>' + opt.title + '</legend></fieldset>'    
		};
		opt.title = null;
		var defaultOpt = {
			style:{
				border:'1px solid #cecece;',
				borderTop:'0px',
			},
			items: opt.items,
			flex:1,
			padding:'5 10 10 10'
		}
		items[1] = getColumn(Ext.apply(defaultOpt , opt));
		
		var defaultOpt = {
			margin:'10 5 10 5',
			border:false,
			xtype:'panel',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:items
		}
		return Ext.apply(defaultOpt , oopt);
	} else {
		return getColumn(opt);
	}
}

/**
 * 获取一般数据源
 * @param opt
 * @returns {Ext.data.JsonStore}
 */
function getStore(opt) {
	
	opt = opt ||{};
	
	var exception = function (proxy , respone , operation) {
		top.mainframe.loginFrame.valid(respone);
	}
	
	var defaultOpt = {   
		xtype:'json',
		fields : ['id' , 'text'],   
		pageSize : defaultPageSize,
		proxy : {
			type : 'ajax',
			url : opt.url || '',
			headers : opt.headers || null,
			reader : opt.reader || { type : 'json', root : 'data', totalProperty : 'size' },
			listeners:{
				'exception': exception
			}
		}
	};
	
	if (opt.proxy) {			// 覆盖exception方法
		opt.proxy.listeners = opt.proxy.listeners ? opt.proxy.listeners : {};
		opt.proxy.listeners['exception'] = exception;
	}
	if (opt.xtype&&opt.xtype == 'tree') {
		return new Ext.data.TreeStore(Ext.apply(defaultOpt , opt));
	}
	return new Ext.data.JsonStore(Ext.apply(defaultOpt , opt));
}


/**
 * 获取隐藏单字段
 * @param opt
 * @returns
 */
function getHiddenField (opt) {
	var defaultOpt = {
		xtype : 'textfield',
		hidden:true
	};
	return getField(Ext.apply(defaultOpt , opt));
}

/**
 * 获取只读表单字段
 * @param opt
 * @returns
 */
function getReadOnlyField (opt) {
	var defaultOpt = {
		readOnly:true,
		fieldStyle:'background-color:#eee'
	};
	return getField(Ext.apply(defaultOpt , opt));;
}


/**
 * 获取一般表单字段
 * @param opt
 * @returns
 */
function getField (opt) {
	opt = opt || {};
	var defaultOpt = { margin:5, xtype : 'textfield' };
	
	if (opt.text || opt.fieldLabel || top.emptyText) {
		defaultOpt.fieldLabel = opt.text || opt.fieldLabel;
		defaultOpt.labelPad = 20;
		defaultOpt.labelAlign = 'right';	
		defaultOpt.blankText = (defaultOpt.fieldLabel || top.emptyText)  + '不能为空';
	} else {
		defaultOpt.labelWidth = 0;
	}
	
	opt = Ext.apply(defaultOpt , opt);
	if (opt.xtype == 'button') { 
		return getButton (opt); 
	} else if (opt.xtype == 'combobox' || opt.xtype == 'combo') { 
		return getCombobox(opt);
	} else if (opt.xtype == 'numberfield' ) { 
		return getNumberField(opt);
	} else if (opt.xtype == 'areaCombobox') { 
		return getRegionList(opt);
	} else if (opt.xtype == 'date' || opt.xtype == 'datetime') {
		return getDateTime(opt);
	} else if (opt.xtype == 'jsonCombobox' || opt.xtype == 'jsonCombo') {
		return getJsonCombobox(opt);
	} else if (opt.xtype == 'price'){
		opt.xtype = 'textfield';
		return Ext.create('PriceField' , opt);
	}
	return opt;
}

/**
 * 获取一般按钮
 */
function getButton (opt) {
	var defaultOpt = {
		cls:"x-btn-small",
		overCls:"x-btn-over-small",
		focusCls:"x-btn-focus-small",
		disabledCls:"x-btn-disabled-small",
		width:80
	}
	return Ext.apply(defaultOpt , opt);
}

/**
 * 获取一般下拉列表框
 * @param opt
 */
function getCombobox(opt) {
	var defaultOpt = {
		queryMode: 'local',
		xtype:'combobox',
		editable:false,
		valueField:'id',  
		displayField:'text',
	};
	return Ext.apply(defaultOpt , opt);
}


/**
 * 获取加载基础数据Combobox列表
 * @param opt
 * @returns {Ext.form.ComboBox}
 */
function getJsonCombobox(opt) {
	var defaultOpt = {
		xtype:'combobox',
		valueField : 'id',  
       	displayField : 'text',  
       	editable:false,
		store:opt.store || new Ext.data.JsonStore({
			fields: opt.fields || [ 'id', 'text' ],
			proxy: {
				type : 'ajax',
				url :  opt.url,
				reader : {
					type : 'json',
					root : 'data'
				}
			},
			autoLoad:true
		})
	};
	return Ext.apply(defaultOpt , opt);
}

/**
 * 获取数字字段
 */
function getNumberField(opt) {
	var defaultOpt = {
		minValue:0
	};
	if (opt.minValue ) { 
		defaultOpt.minText  = opt.text + '最小值为' + opt.minValue;
	} 
	if (opt.maxValue ) {
		defaultOpt.maxText = opt.text + '最大值为' + opt.maxValue;
	}
	return Ext.apply(defaultOpt , opt);
}

/**
 * 获取地区控件
 */
function getRegionList(opt) {
	if (opt.cls) {
		opt.cls = 'city-picker ' + opt.cls;
	} else {
		opt.cls = 'city-picker'; 
	}
	if (!opt.name) {
		opt.name = opt.id || parseInt(Math.random()*10000000);
	}
	opt.listeners = {
		'afterrender' : function () {
			if (opt.changeFun) {
				$('input[name=' + opt.name + ']')[0]['changeCallback'] = opt.changeFun;
			}
		}
	}
	return Ext.create("regionTextField" , opt);
	
}

/**
 * 获取地区下拉框
 */
function getAreaComboboxTree(opt) {
	var defaultOpt = {
		valueField: 'id',
		displayField: 'text',
		xtype:'areaCombobox',
		editable:false,
		root:getCacheData('AREA_LIST' , true)
	};
	return Ext.create('ComboAreaTreeBox' , Ext.apply(defaultOpt , opt));
}


/**
 * 获取时分控件
 * @param obj
 * @returns 
 */
function getDateTime(opt){ 
	opt.type = opt.xtype == 'datetime' ? 'datetimepicker' : 'datepicker';
	if (opt.valueInit) {
		opt.value = (
			opt.type == 'datetimepicker' ? Ext.util.Format.date(new Date(),"Y-m-d H:i") : Ext.util.Format.date(new Date(),"Y-m-d")
		);
	}
	opt.xtype = 'textfield';
	opt.fieldCls = opt.type;
 	return opt;
}

/**
 * 一般编辑窗口
 */
function getWindow(opt) {
	var defaultOpt = {
		title: '新增/编辑窗口',
		autoScroll:true,
		resizable : false, // 改变大小   
		frame:true,
	    height: 300,
	    width: 400,
	    layout: 'fit',
	    closeAction:'hide',
	    modal:true
	};
	return new Ext.window.Window(Ext.apply(defaultOpt , opt));
}


/**
 * 获取一般表单标题
 */
function getTitle(opt) {
	var defaultOpt = {
		xtype:'label' ,text:'优惠票数量价格' , width:'100%' , style:{
		   	lineHeight:'26px',
		   	marginLeft:'5px',
		   	marginTop:'5px',
		   	fontWeight:'bold',
		   	fontSize:'13px'
		}};
	return Ext.apply(defaultOpt , opt);
}

/**
 * 根据paths对象， 获取路径树
 * isHide : 是否隐藏已有运力 空缺运力  defualt false
 */
function getPathTree(paths , isHide) {
	
	if (!paths) {
		return {
			id:-1,
			text:'无任何记录',
			leaf:true
		}
	}
	
	var root = {
		id:-1,
		text:'路径信息',
		leaf:false,
		icon:getTreeIcon('path'),
		children:[]
	};
	
	for (var i in paths) {
		var data = paths[i];
		
		var icon = getTreeIcon('trans');
		if (data.transTypeCode == 'TRANS_TYPE_RAIL') {
			icon = getTreeIcon('railway');
		} else if (data.transTypeCode == 'TRANS_TYPE_SEA') {
			icon = getTreeIcon('sea');
		}
		
		var temp = {
			text:data.transTypeName + ' [' + data.startRegionName + '->' + data.endRegionName + ']',
			leaf:false,
			slat:data.startEntrepotLat,
			slng:data.startEntrepotLng,
			elat:data.endEntrepotLat,
			elng:data.endEntrepotLng,
			icon:icon,
			children:[]
		}
		if (data.usebleTeuNumber) 
			data.usebleTeuNumber = data.usebleTeuNumber < 0 ? 0 :data.usebleTeuNumber;
		if (data.lackTeuNumber) 
			data.lackTeuNumber = data.lackTeuNumber < 0 ? 0 :data.lackTeuNumber;
		
		temp.children[temp.children.length] = {
				text: '起运地网点：' + data.startEntrepotName + ' [' + data.startEntrepotTypeName + ']',
				leaf:true,
				icon:getTreeIcon('startFont')
	        };
		temp.children[temp.children.length] = {
				text: '目的地网点：' + data.endEntrepotName + ' [' + data.endEntrepotTypeName + ']',
				leaf:true,
				icon:getTreeIcon('endFont')
	        };
		temp.children[temp.children.length] = {
				text: '预计耗时：' + data.expectTime /60 + '（小时）',
				leaf:true,
				icon:getTreeIcon('time')
	        };
		temp.children[temp.children.length] = {
				text: '里程：' + (data.mileage || 0) + '（KM）',
				leaf:true,
				icon:getTreeIcon('mileage')
	        };
		if (data.transTypeCode == 'TRANS_TYPE_RAIL') {
			temp.children[temp.children.length] = {
					text: '电气化里程：' + (data.electricRailwayMileage || 0) + '（KM）',
					leaf:true,
					icon:getTreeIcon('electric')
		        }
		}
		if (!isHide) {
			temp.children[temp.children.length] = {
					text: '已有运力：' + (data.usebleTeuNumber || 0),
					leaf:true,
					icon:getTreeIcon('greed')
		        };
			temp.children[temp.children.length] = {
				text: '空缺运力：' + (data.lackTeuNumber  || 0),
				leaf:true,
				icon:getTreeIcon('red')
	        };
		}
		
		root.children[root.children.length] = temp;
	}
	return root;
}

/**
 * 返回grid表单中按钮
 */
function getGridBtnHtml (opt) {
	width =  opt.text ?  opt.text.length *12 + 35 : 28;
	return '<a title="' +  (opt.title || '')+ '" class="x-btn x-btn-small x-unselectable x-box-item x-toolbar-item x-btn-default-toolbar-small x-grid-cell-inner-btn-cls" ' + 
	'style="width:' + width +'px; right: auto; top: 0px;" hidefocus="on" unselectable="on" ' + 
	'id="button-1014" tabindex="0" componentid="button-1014" onclick=\'' + opt.fun + ';\' >' + 
	'<span id="button-1014-btnWrap" data-ref="btnWrap" role="presentation" ' + 
	'unselectable="on" style="table-layout:fixed;" class="x-btn-wrap x-btn-wrap-default-toolbar-small ">' + 
	'<span id="button-1014-btnEl" data-ref="btnEl" role="presentation" unselectable="on" ' + 
	'style="" class="x-btn-button x-btn-button-default-toolbar-small x-btn-text  x-btn-icon x-btn-icon-left x-btn-button-center ">' + 
	(!opt.icon ? '' : 	
	'<span id="button-1014-btnIconEl" data-ref="btnIconEl" role="presentation" unselectable="on" ' + 
	'class="x-btn-icon-el x-btn-icon-el-default-toolbar-small  " ' + 
	'style="background-image:url(' + opt.icon + ');">&nbsp;</span>' ) +
	'<span id="button-1014-btnInnerEl" data-ref="btnInnerEl" unselectable="on" ' + 
	'class="x-btn-inner x-btn-inner-default-toolbar-small">' + opt.text + '</span></span></span></a>' ;
}



/**
 * 获取查询grid中的编辑按钮
 * @param opt
 * @returns {gridColumn}
 */
function getEditBtnByGrid(opt){
	var defaultOpt = {
		heander:'编辑',
    	align: 'center',
    	dataIndex: 'id',
    	width:40,
    	renderer:function (value, data){
			var html =  "<img src='" + (global.editImgUrl || '') + "' style='cursor: pointer;' title='编辑当前记录' onclick=\"" + opt.fun + "(\'" + value + "\');\" />";
		   	return html;
    	}
	};
	return Ext.apply(defaultOpt , opt);
}

/**
 * 获取查询grid中的删除按钮
 * @param opt
 * @returns {gridColumn}
 */
function getDeleteBtnByGrid(opt){
	var deleteUrl = opt.deleteUrl || "";
	var deleteModel = opt.deleteModel || "";
	
	var defaultOpt = {
		heander:'删除',
    	align: 'center',
    	dataIndex: 'id',
    	width:40,
    	renderer:function (value, data){
    		return "<img src='" + (global.deleteImgUrl || '') + "' style='cursor: pointer;' title='" + (opt.title || '删除当前记录') + "' onclick=\"" + (opt.fun || 'deleteRecord') + "(\'" + (deleteUrl || deleteModel) + "\',\'" + value + "\');\" />";
    	}
	};
	return Ext.apply(defaultOpt , opt);
}

/**
 * 通用删除方法
 * @param param  mondelName || deleteUrl
 * @param enterId
 */
function deleteRecord(param, enterId){
	var url;
	var model;
	if (param.indexOf('.') != -1 ){
		url = param;
	} else {
		model = param;
	}
	Ext.Msg.confirm('提示','确定要删除所选记录吗？',function (btn){
		if (btn == 'yes'){
			var actionUrl = '';
			if(url){
				actionUrl = url + "?EntityID=" + enterId;
			} else {
				actionUrl = global.deleteEntityUrl + "?EntityID=" + enterId;
			}
			Ajax.request({
				url:actionUrl,
				callback: function (){
					if (Ext.getCmp('queryGrid')) {
						Ext.getCmp('queryGrid').getStore().loadPage(1);
					}
				}
			})
		}
	});
}

/**
 * form 中的textfiel自适应
 * param:form的id
 */
function autoFitForm(form) {
	var width = get(form).body.dom.style.width;
	var fields = get(form).items.items;
	if (width < '400px') {
		$.each(fields, function(key, value) {
					if (value.columnWidth <= 0.5)
						value.columnWidth = 0.9;
					if (value.columnWidth == 0.8)
						value.columnWidth = 0.91;
				})
		get(form).doLayout();
	} else {
		$.each(fields, function(key, value) {
					if (value.columnWidth == 0.9)
						value.columnWidth = 0.5;
					if (value.columnWidth == 0.91)
						value.columnWidth = 0.8;
				})
		get(form).doLayout();
	}
}

