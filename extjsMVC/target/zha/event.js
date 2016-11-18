/**
 * Created by java on 2016/11/7.
 */
Ext.onReady(function () {
    //Ext.create('Ext.panel.Panel',{//小写的create()
    //    renderTo: Ext.getBody(),
    //    width: 700,
    //    height: 500,
    //    border: true,
    //    html:'面板',
    //    listeners:{
    //        afterrender:function() { //展示完成事件
    //            Ext.Msg.alert('提示标题','加载成功！！！');
    //        }
    //    }
    //});

//======================================================================================================
//    Ext.create('Ext.Button',{
//        text:'确定',
//        renderTo:Ext.getBody(),
//        listeners: {
//            click: function() {//单击事件
//                Ext.Msg.alert('Success','yes sure');
//            }
//        }
//    });


//======================================================================================================
//    Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'My Button',
//        height: 50,
//        listeners:{
//            mouseover: function() {
//                this.hide();
//            },
//            hide: function() {
//                // Waits 1 second (1000ms), then shows the button again
//                Ext.defer(function () {
//                    this.show();
//                },1000,this);
//            }
//        }
//    });
//======================================================================================================
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'My Button'
//    });
//
//    button.on('click', function () {//on 方法添加事件
//        Ext.Msg.alert('Success!', 'Event listener attached by .on');
//    });
//======================================================================================================
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'Button'
//    });
//
//    button.on({
//        mouseover: function () {
//            this.hide();
//        },
//        hide: function () {
//            Ext.defer(function() {
//                this.show();
//            }, 1000, this);
//        }
//    });

//======================================================================================================
//    var doSomething = function() {
//        Ext.Msg.alert('listener called');
//    };
//
//    var doSomething2 = function(){
//        Ext.Msg.alert('mouse over');
//    };
//
//
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'My Button',
//        listeners: {
//            click: doSomething,
//            mouseover : doSomething2
//        }
//    });
//
//    Ext.defer(function() {//3秒后移除单击事件  //defer定时方法 un方法移除指定事件
//        button.un('click', doSomething);
//    }, 3000);

//======================================================================================================
//    var panel = Ext.create('Ext.Panel', {
//        html: 'Panel HTML'
//    });
//
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'Click Me'
//    });
//
//    button.on({
//        click: function() {
//            Ext.Msg.alert('Success!', this.getXType());
//        },
//       scope: panel
//    });
//======================================================================================================
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'Click Me',
//        listeners: {
//            click: {
//                single: true,//事情只显示一次
//                fn: function() {
//                    Ext.Msg.alert('Success!','I will say this only once');
//                }
//            }
//        }
//    });
//======================================================================================================
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: 'Click Me',
//        listeners: {
//            click: {
//                buffer: 2000,//reduce the number of times our listener is called 减少事件触发的次数
//                fn: function() {
//                    Ext.Msg.alert('Success!','I say this only once every 2 seconds');
//                }
//            }
//        }
//    });
//======================================================================================================
//    var button = Ext.create('Ext.Button', {
//        renderTo: Ext.getBody(),
//        text: "Just wait 2 seconds",
//        listeners: {
//            myEvent: function(button, points) {
//                Ext.Msg.alert('Success!','myEvent fired! You score ' + points + ' points');
//            }
//        }
//    });
//
//    Ext.defer(function () {
//        var number = Math.ceil(Math.random() * 100);
//        button.fireEvent('myEvent',button,number);
//    },2000)
////======================================================================================================
//    var container = Ext.create('Ext.Container', {
//        renderTo: Ext.getBody(),
//        html: 'Click Me!',
//        height:200,
//        length:300,
//        listeners: {
//            click: function(){
//                Ext.Msg.alert('Success!', 'I have been clicked!')
//            }
//        }
//    });
//
//    container.getEl().on('click', function () {//DOM 事件
//        this.fireEvent('click', container);
//    },container);
//======================================================================================================

});