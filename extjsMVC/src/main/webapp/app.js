Ext.onReady(function () {
  //1.定义Model
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
  });
});