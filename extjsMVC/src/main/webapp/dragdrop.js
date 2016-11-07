/**
 * Created by java on 2016/11/7.
 */

Ext.onReady(function() {
    // Create an object that we'll use to implement and override drag behaviors a little later

    var overrides = {};

    // Configure the cars to be draggable
    var carElements = Ext.get('cars').select('div');
    Ext.each(carElements.elements, function(el) {
        var dd = Ext.create('Ext.dd.DD', el, 'carsDDGroup', {
            isTarget  : false
        });
        //Apply the overrides object to the newly created instance of DD
        Ext.apply(dd, overrides);
    });

    var truckElements = Ext.get('trucks').select('div');
    Ext.each(truckElements.elements, function(el) {
        var dd = Ext.create('Ext.dd.DD', el, 'trucksDDGroup', {
            isTarget  : false
        });
        Ext.apply(dd, overrides);
    });
});
