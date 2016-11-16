<%--
  Created by IntelliJ IDEA.
  User: java
  Date: 2016/11/15
  Time: 12:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<html>
<head>
  <jsp:include page="../../commons/global.jsp"/>
  <script type="text/javascript">
      var $thisObj = {};

      Ext.onReady(function () {

        //var panel = new Ext.panel.Panel(options);

        $thisObj.listPanel = getPanel({
          flex:1,
          layout:{
            type:'vbox',
            align:'stretch'
          },
          tbar:[
            {xtype:'tbfill'},
            getField({xtype:'button' , text:'查询' , icon:getIcon('query'), margin:0, handler: function (){
              //get('listGrid').getStore().loadPage(1);
            }}),
            getField({xtype:'button' , text:'重置' , icon:getIcon('reset'), margin:'0 5 0 5', handler: function (){
             // get('listSearchForm').getForm().reset();
            }})
          ],
          items:[
            getForm({
              frame:false,
              id:'listSearchForm',
              height:90,
              bodyStyle:{
                border:'0px',
                borderBottom:'1px solid #cecece',
                padding:'10px'
              },
              items:[

                getField({ emptyText:'检索文本' ,  name:'searchText'  }),
                getField({ text:'待实名认证企业' , xtype:'checkbox', name:'authStaus' , inputValue:'1'  }),
                getField({ text:'待资质认证企业' , xtype:'checkbox', name:'quaAuthStatus' , inputValue:'1'  }),
                //getField({ emptyText:'企业类型' ,  name:''  }),
                //getField({ emptyText:'企业注册地' ,  name:'regionCode' , xtype:'areaCombobox'  })
              ]
            }),
            getGrid({
              border:false,
              frame:false,
              id:'listGrid',
              flex:1,
//              store:getStore({
//                url:'/company/list_form',
//                listeners:{
//                  'beforeload' : function (store){
//                    var params = get('listSearchForm').getValues();
//                    if (params.searchType) {
//                      if (params.searchType == '1' ) {
//                        params.loginName = params['searchText'];
//                      } else if (params.searchType == '2') {
//                        params.name = params['searchText'];
//                      }
//                    }
//                    /* CONTRACT_CARRIER(1, "签约承运商"), REGISTER_USER(2, "注册用户"), REAL_NAME_USER(3, "实名用户"), AUTH_USER(4, "认证用户") , PLATFORM(5, "平台企业"); */
//                    params.type = [2,3,4];
//                    params.isSign = 0;
//                    store.proxy.extraParams = filterParams(params);
//                  }
//                },
//              }),
              columns:[
                new Ext.grid.RowNumberer({ header:'序号' ,width:50, align: 'center'}),
                { header: "客户编号", dataIndex: 'userCode', width:150 },
                { header: "账号", dataIndex: 'loginName', width:150 },
                { header: "企业名称", dataIndex: 'name', width:150 },
                { header: "企业类型", dataIndex: 'type', width:150 , renderer: function (value){
                  return getBaseDataText(value , 'COMPANY_TYPE');
                } },
                { header: "企业注册地", dataIndex: 'regionName', width:150 }
              ],
              listeners:{
//                'itemclick' : function (panel, record , item){
//                  $thisObj.loadDetailFun(record.data.id , record.data.status);
//                }
              }
            })
          ]
        });


        var viewport = Ext.create('Ext.Viewport', {
          border:false,
          layout:{
            type:'hbox',
            align:'stretch'
          },
          //renderTo:true,
          items: [
            $thisObj.listPanel,
            //$thisObj.detailPanel
          ]
          /*listeners : {
            'afterrender' : function() {
              $('.city-picker').find('input').citypicker();
            }
          }*/
        });
        buildQueryDate();//初始化日期控件
      });
  </script>
</head>
<body>
</body>
</html>
