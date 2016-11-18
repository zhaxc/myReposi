/**
 * Created by java on 2016/11/7.
 */
Ext.onReady(function() {
    //Ext.create('Ext.form.Panel', {
    //    renderTo: document.body,
    //    title: 'User Form',
    //    height:400,
    //    width: 300,
    //    border: true,
    //    bodyPadding: 10,
    //    defaultType: 'textfield',
    //    url:'/abc',
    //    items: [
    //        {
    //            fieldLabel: 'First Name',
    //            name: 'firstName'
    //        },
    //        {
    //            fieldLabel: 'Last Name',
    //            name: 'lastName'
    //        },
    //        {
    //            xtype: 'datefield',
    //            fieldLabel: 'Date of Birth',
    //            name: 'birthDate',
    //            msgTarget: 'under', // location of the error message
    //            invalidText: '"{0}" bad. "{1}" good.' // custom error message text
    //        }
    //    ],
    //    buttons:[
    //        {
    //            text:'提交',
    //            handler: function(){
    //                var form = this.up('form'); // get the form panel
    //                if (form.isValid()) { // make sure the form contains valid data before submitting
    //                    form.submit({
    //                        success: function(form, action) {
    //                            Ext.Msg.alert('Success', action.result.msg);
    //                        },
    //                        failure: function(form, action) {
    //                            Ext.Msg.alert('Failed', action.result.msg);
    //                        }
    //                    });
    //                } else { // display error alert if the data is invalid
    //                    Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
    //                }
    //            }
    //        }
    //    ]
    //});

    //===================================================================================================================
    Ext.create('Ext.form.Panel', {
        renderTo: document.body,
        title: 'User Form',
        height: 120,
        width: 585,
        defaults: {
            xtype: 'textfield',
            labelAlign: 'top',
            padding: 10
        },
        layout: 'hbox',
        items: [
            {
                fieldLabel: 'First Name',
                name: 'firstName'
            },
            {
                fieldLabel: 'Last Name',
                name: 'lastName'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Date of Birth',
                name: 'birthDate'
            }
        ]
    });
});



