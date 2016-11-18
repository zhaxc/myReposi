Ext.onReady(function () {
 /* //1.定义Model
  Ext.define("MyApp.model.User", {
    extend: "Ext.data.Model",
    fields: [
      { name: 'name', type: 'string' },
      { name: 'age', type: 'int' },
      { name: 'phone', type: 'string' }
    ]
  });

  //2.创建store
  var store = Ext.create("Ext.data.Store", {
    model: "MyApp.model.User",
    data: [
      { name: "Tom", age: 5, phone: "123456" },
      { name: "Jerry", age: 3, phone: "654321" }
    ]
  });

  //3.创建grid
  var viewport = Ext.create("Ext.container.Viewport", {
    layout: "fit",
    items: {
      xtype: "grid",
      model: "MyApp.model.User",
      store: store,
      columns: [
        { text: '姓名', dataIndex: 'name' },
        { text: '年龄', dataIndex: 'age', xtype: 'numbercolumn', format: '0' },
        { text: '电话', dataIndex: 'phone' }
      ]
    }
  });

  //4.添加双击编辑
  var grid = viewport.down("grid");
  grid.on("itemdblclick", function (me, record, item, index, e, eopts) {
    //5.创建编辑表单
    var win = Ext.create("Ext.window.Window", {
      title: "编辑用户",
      width: 300,
      height: 200,
      layout: "fit",
      items: {
        xtype: "form",
        margin: 5,
        border: false,
        fieldDefaults: {
          labelAlign: 'left',
          labelWidth: 60
        },
        items: [
          { xtype: "textfield", name: "name", fieldLabel: "姓名" },
          { xtype: "numberfield", name: "age", fieldLabel: "年龄" },
          { xtype: "textfield", name: "phone", fieldLabel: "电话" }
        ]
      },
      buttons: [
        {
          text: "保存", handler: function () {
          win.down("form").updateRecord();
          record.commit();
          win.close();
        }
        }
      ]
    });
    win.down("form").loadRecord(record);
    win.show();
  });*/


/*  Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    width: 700,
    height: 500,
    border: true,
    title: 'Container Panel',
    items: [{
      xtype: 'panel',
      title: 'Child Panel 1',
      height: 100,
      width: '75%',
      border: true
    }, {
      xtype: 'panel',
      title: 'Child Panel 2',
      height: 100,
      width: '75%',
      border: true
    }]
  });*/

  /*Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    width: 400,
    height: 400,
    title: 'Container Panel',
    layout: 'column',//layout管理子容器或组件的布局
    border: true,
    items: [
      {
        xtype: 'panel',
        title: 'Child Panel 1',
        height: 100,
        columnWidth: 0.5,
        border: true
      },
      {
        xtype: 'panel',
        title: 'Child Panel 2',
        height: 100,
        columnWidth: 0.5,
        border: true
      }
    ]
  });*/

  var containerPanel = Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    width: 400,
    height: 200,
    title: 'Container Panel',
    layout: 'column',
    suspendLayout: true // Suspend automatic layouts while we do several different things that could trigger a layout on their own
  });

// Add a couple of child items.  We could add these both at the same time by passing an array to add(),
// but lets pretend we needed to add them separately for some reason.

  containerPanel.add({
    xtype: 'panel',
    title: 'Child Panel 1',
    height: 100,
    columnWidth: 0.5
  });

  containerPanel.add({
    xtype: 'panel',
    title: 'Child Panel 2',
    height: 100,
    columnWidth: 0.5
  });

// Turn the suspendLayout flag off.  延缓（suspend）
  containerPanel.suspendLayout = false;
// Trigger a layout.
  containerPanel.updateLayout();  //updateLayout 方法是递归循环的（recursive），每一个子容器都有这个方法
});