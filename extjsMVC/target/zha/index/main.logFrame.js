/**
 * 
 * 登录失效， 显示重新登录窗口
 * 
 */


var Main_LogFrame = {
		/*variable : {
			timeoutCode:Ajax.variable.TIME_OUT,
			timeoutFlag:'timeout'
		},
		build : function () {
			this.window = getWindow({
				height:180,
				width:390,
				title:'重新登录',
				layout:'fit',
				closable:false,
				border:false,
				frame:false,
				padding:'10 10 0 10',
				items:[
				       getColumn({
				    	   id:'timeoutLoginForm',
				    	   xtype:'form',
				    	   items:[
					    	   getReadOnlyField({
					    		   text:'用户名',
					    		   name:'loginUserName',
					    		   allowBlank:false,
					    		   value:Main_logoCom.loginUser.loginName
					    	   }),
					    	   getField({
					    		   text:'密码',
					    		   allowBlank:false,
					    		   inputType:'password',
					    		   name:'loginPassword',
					    		   value:''
					    	   })
		    	          ]
				       })
		        ],
				bbar:[
			      {xtype:'tbfill'},
			      getField({
			    	  xtype:'button',
			    	  margin:0,
			    	  text:'登录',
			    	  handler:function () {
			    		  
			    		  if(!get('timeoutLoginForm').isValid()) {
			    			  return ;
			    		  }
			    		  
			    		  var userName = get('timeoutLoginForm').getValues()['loginUserName'];
			    		  var password = get('timeoutLoginForm').getValues()['loginPassword'];
			    		  
			    		  password = hex_md5(hex_md5(password));
			    		  
			    		  Ajax.request({
		    			  		url:basePath + '/login' ,
		    			  		hide:true,
		    			  		params:{
		    			  			username:userName,
		    			  			password : password
		    			  		},
		    			  		execute:function (result , success) {
		    			  			if (success) {
		    			  				showMsgBox({msgType:'s' , text:'登录成功'});
		    			  				Main_LogFrame.window.hide();
		    			  			} else {
		    			  				showMsgBox({msgType:'w' , text:'密码错误，请重试'});
		    			  			}
		    			  		} 
			    		  })
			    	  }
			      })
		      ]
			})
			return this;
		},
		show : function (){
			this.window.show();
		},
		/!**
		 * 验证是否出现异常
		 *!/
		valid : function ( respone , statusCode){
			
			if (respone && respone.getResponseHeader('sessionstatus') == this.variable.timeoutFlag) {
				this.show();
			} else if (statusCode == this.variable.timeoutCode) {
				this.show();
			}
		}*/
};