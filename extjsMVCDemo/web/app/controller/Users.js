/**
 * Created by yangqiangyu on 5/5/16.
 */
Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',
    views: [
        'user.List',
        'user.Edit'
    ],
    stores: [
        'Users'
    ],
    models: ['User'],
    init: function() {
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            },
            'userlist': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            }
        });
    },
    onPanelRendered: function() {
        console.log('The panel was rendered');
    },
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');
        view.down('form').loadRecord(record);
    },
    // updateUser: function(button) {
    //     var win    = button.up('window'),
    //         form   = win.down('form'),
    //         record = form.getRecord(),
    //         values = form.getValues();
    //     record.set(values);
    //     win.close();
    // }
    updateUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        // synchronize the store after editing the record
        this.getUsersStore().sync();
    }
});